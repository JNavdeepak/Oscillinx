import type { Metadata, Viewport } from "next";
import "./tokens.css";
import "./style.css";
import { Header, Footer } from "../components/Frame";
import SmoothScroll from "../components/SmoothScroll";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://oscillinx.com"),
  title: {
    default: "OSCILLINX — Intelligence beyond connectivity",
    template: "%s · OSCILLINX",
  },
  description:
    "Explore the offline-first AI environment for running compatible language models on your own hardware.",
  keywords: [
    "OSCILLINX",
    "offline AI",
    "local LLM",
    "on-device intelligence",
    "llama.cpp",
    "privacy-first AI",
    "GGUF models",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oscillinx.com",
    siteName: "OSCILLINX",
    title: "OSCILLINX — Intelligence beyond connectivity",
    description:
      "Explore the offline-first AI environment for running compatible language models on your own hardware.",
    images: [
      {
        url: "/assets/desktop.png",
        width: 1024,
        height: 565,
        alt: "OSCILLINX Desktop Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OSCILLINX — Intelligence beyond connectivity",
    description:
      "Explore the offline-first AI environment for running compatible language models on your own hardware.",
    images: ["/assets/desktop.png"],
  },
};

const themeInit =
  "try{document.documentElement.dataset.theme=localStorage.getItem('osc-theme')==='light'?'light':'dark'}catch{}";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <SmoothScroll />
        <a className="skip" href="#content">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
