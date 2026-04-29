import type { Metadata } from "next";
import { Sora, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const sora = Sora({ 
  subsets: ["latin"], 
  variable: "--font-display", 
  weight: ["400", "600", "700", "800"] 
});

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-body", 
  weight: ["400", "500", "600"] 
});

const jetBrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono" 
});

export const metadata: Metadata = {
  title: "CineSync - Watch Together",
  description: "Watch together. Anywhere. Together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Default to dark theme for now
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          sora.variable,
          dmSans.variable,
          jetBrainsMono.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
