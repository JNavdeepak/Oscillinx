export const REPO_OWNER = "capstone-IITP";
export const REPO_NAME = "Oscillinx";

export interface ReleaseInfo {
  versionName: string;
  versionCode: number;
  tag: string;
  name: string;
  apkFilename: string;
  downloadUrl: string;
  size?: number | null;
  sizeFormatted?: string | null;
  publishedAt?: string | null;
}

export const INITIAL_RELEASE: ReleaseInfo = {
  versionName: "1.0.0",
  versionCode: 1,
  tag: "v1.0.0",
  name: "OSCILLINX v1.0.0",
  apkFilename: "Oscillinx.apk",
  downloadUrl: `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/download/v1.0.0/Oscillinx.apk`,
  size: 138825245,
  sizeFormatted: "132.4 MB",
  publishedAt: "Nov 21, 2026",
};

export const windows = "/downloads/Oscillinx.exe";
export const android = INITIAL_RELEASE.downloadUrl;
