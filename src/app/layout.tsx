import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import AppProvider from "@/providers/AppProvider";
import JotaiProvider from "@/providers/JotaiProvider";
import { sofia } from "@/app/font";

export const metadata: Metadata = {
  title: "MedConnect | Healthcare for Rural Communities",
  description:
    "MedConnect aims to improve healthcare accessibility for rural communities by connecting them with healthcare providers, facilitating medical services, and offering health education and resources.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          sofia.className,
          "scroll-smooth overflow-x-hidden bg-secondary-gray/10 scrollbar-hide"
        )}
        suppressHydrationWarning
      >
        <JotaiProvider>
          <AppProvider>{children}</AppProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
