import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wok Konek – Empowering Local Skills in PNG",
  description:
    "Connect with skilled taskers in Papua New Guinea. Post a job, receive bids, and get work done — powered by Wok Konek.",
  icons: {
    icon: "/assets/wokkonek_logo_no-bg.png",
    apple: "/assets/wokkonek_logo_no-bg.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
