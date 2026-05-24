// Root layout — aplicado em todas as páginas
// Nota: usando link Google Fonts via globals.css pois next/font tem problemas no Windows
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "IA Educadores",
    template: "%s | IA Educadores",
  },
  description:
    "Plataforma de formação em Inteligência Artificial para profissionais da educação",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "IA Educadores",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "IA Educadores",
    title: "IA Educadores",
    description:
      "Formação em IA para profissionais da educação — 24 módulos, 80 horas",
  },
};

export const viewport: Viewport = {
  themeColor: "#1D9E75",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" style={{ colorScheme: "light" }}>
      <head>
        <meta name="color-scheme" content="light" />
        {/* Desabilita Dark Reader (extensão) para renderizar corretamente */}
        <meta name="darkreader-lock" />
        {/* Google Fonts — Inter e JetBrains Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Tags Apple PWA */}
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="IA Educadores" />
        <link rel="icon" href="/icons/icon-96.png" />
      </head>
      <body style={{ fontFamily: "Inter, system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
