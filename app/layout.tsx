import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

const basePath = process.env.NODE_ENV === "production" ? "/Convert.io" : "";

export const metadata: Metadata = {
  title: "Convert.io",
  description: "Modern universal converter for units and currency",
  icons: {
    icon: [
      { url: `${basePath}/favicon/favicon.ico` },
      { url: `${basePath}/favicon/favicon-16x16.png`, sizes: "16x16", type: "image/png" },
      { url: `${basePath}/favicon/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: `${basePath}/favicon/apple-touch-icon.png`, sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: `${basePath}/favicon/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
