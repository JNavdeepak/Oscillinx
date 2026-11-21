"use client";

import { useEffect, useState, useRef } from "react";
import { Icon } from "./Frame";
import {
  REPO_OWNER,
  REPO_NAME,
  INITIAL_RELEASE,
  ReleaseInfo,
} from "./Release";

const CACHE_KEY = "oscillinx_release_cache_v1";
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes cache

function formatBytes(bytes?: number | null): string | null {
  if (!bytes || isNaN(bytes) || bytes <= 0) return null;
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) {
    return `${mb.toFixed(1)} MB`;
  }
  return `${(bytes / 1024).toFixed(0)} KB`;
}

function formatDate(iso?: string | null): string | null {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return null;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

export default function AndroidDownload() {
  const [release, setRelease] = useState<ReleaseInfo>(INITIAL_RELEASE);
  const [isLive, setIsLive] = useState<boolean | "unknown">("unknown");
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const downloadTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchLatestRelease() {
      // 1. Check local cache
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (
            parsed &&
            parsed.timestamp &&
            Date.now() - parsed.timestamp < CACHE_TTL_MS &&
            parsed.release
          ) {
            if (isMounted) {
              setRelease(parsed.release);
              setIsLive(parsed.isLive ?? true);
            }
            return;
          }
        }
      } catch {
        // Ignore cache storage errors
      }

      // 2. Fetch from GitHub Releases API
      try {
        const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`;
        const res = await fetch(apiUrl, {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        });

        if (res.status === 200) {
          const data = await res.json();
          const assets: Array<{
            name: string;
            browser_download_url: string;
            size: number;
          }> = data.assets || [];

          // Find APK asset, prioritizing 'Oscillinx.apk'
          const apkAsset =
            assets.find(
              (a) => a.name.toLowerCase() === "oscillinx.apk",
            ) ||
            assets.find((a) =>
              a.name.toLowerCase().endsWith(".apk"),
            );

          if (apkAsset) {
            const detectedRelease: ReleaseInfo = {
              versionName: (data.tag_name || "1.0.0").replace(/^v/, ""),
              versionCode: 1,
              tag: data.tag_name || "v1.0.0",
              name: data.name || `OSCILLINX ${data.tag_name || "v1.0.0"}`,
              apkFilename: apkAsset.name,
              downloadUrl:
                apkAsset.browser_download_url ||
                `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/${data.tag_name}/${apkAsset.name}`,
              size: apkAsset.size,
              sizeFormatted: formatBytes(apkAsset.size),
              publishedAt: formatDate(data.published_at),
            };

            if (isMounted) {
              setRelease(detectedRelease);
              setIsLive(true);
              setError(null);
            }

            try {
              sessionStorage.setItem(
                CACHE_KEY,
                JSON.stringify({
                  timestamp: Date.now(),
                  release: detectedRelease,
                  isLive: true,
                }),
              );
            } catch {}
          } else {
            // Release published, but no APK asset found
            if (isMounted) {
              setIsLive(false);
            }
          }
        } else if (res.status === 404) {
          // No published release yet on GitHub
          if (isMounted) {
            setIsLive(false);
          }
        } else if (res.status === 403) {
          // GitHub API rate limited
          if (isMounted) {
            setIsLive("unknown");
          }
        } else {
          if (isMounted) {
            setIsLive("unknown");
          }
        }
      } catch {
        // Network error / offline
        if (isMounted) {
          setIsLive("unknown");
        }
      }
    }

    fetchLatestRelease();

    return () => {
      isMounted = false;
      if (downloadTimerRef.current) {
        clearTimeout(downloadTimerRef.current);
      }
    };
  }, []);

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevent duplicate clicks while already initiating download
    if (isDownloading) {
      e.preventDefault();
      return;
    }

    // Check if release asset is available
    if (isLive === false) {
      e.preventDefault();
      setError(
        `The ${release.apkFilename} release asset is currently being published to GitHub. Please check back shortly.`,
      );
      return;
    }

    if (!release.downloadUrl) {
      e.preventDefault();
      setError("No APK release asset is currently available.");
      return;
    }

    // Clear error & start download feedback
    setError(null);
    setIsDownloading(true);

    // Direct browser navigation to asset URL:
    // GitHub release download URLs return 302 with Content-Disposition: attachment,
    // which triggers native browser download without leaving or replacing the current page.
    e.preventDefault();
    if (isLive === true) {
      window.location.assign(release.downloadUrl);
    } else {
      // Hidden iframe fallback if live status is unverified (avoids top-frame navigation on error)
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = release.downloadUrl;
      document.body.appendChild(iframe);
      setTimeout(() => {
        try {
          document.body.removeChild(iframe);
        } catch {}
      }, 30000);
    }

    // Reset subtle downloading state after 4 seconds
    downloadTimerRef.current = setTimeout(() => {
      setIsDownloading(false);
    }, 4000);
  };

  const metaDetails = [
    release.sizeFormatted,
    release.publishedAt,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="download-item">
      <a
        className={`btn ghost ${isDownloading ? "btn-downloading" : ""}`}
        href={release.downloadUrl}
        download={release.apkFilename}
        onClick={handleDownload}
        aria-label={`Download Android APK (${release.apkFilename})`}
      >
        <Icon kind="down" />
        {isDownloading ? "Downloading…" : "Android APK"}
      </a>
      <div className="download-meta">
        <span className="version-label">
          Latest Version: <b>{release.tag}</b>
        </span>
        {metaDetails && <span className="meta-sub"> · {metaDetails}</span>}
      </div>
      {error && (
        <div className="download-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
