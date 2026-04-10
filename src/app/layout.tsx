import "./globals.css";
import "leaflet/dist/leaflet.css";

import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import { AppShell } from "@/components/AppShell";
import { NetworkProvider } from "@/context/NetworkContext";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Network Performance Copilot",
  description: "Demo dashboard for telecom network performance"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body>
        <NetworkProvider>
          <AppShell>{children}</AppShell>
        </NetworkProvider>
      </body>
    </html>
  );
}
