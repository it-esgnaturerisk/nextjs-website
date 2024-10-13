import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import FooterComponent from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ESGNature",
  description: "Under Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex-col h-screen">
          <Header />
          <div role="main" className="bg-greengray flex-grow h-screen">
            {children}
          </div>
          {/* <FooterComponent /> */}
        </div>
      </body>
    </html>
  );
}
