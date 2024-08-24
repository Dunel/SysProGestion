import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SessionAuthProvider from "@/context/SessionProvider";
import { NavBarProvider } from '@/context/NavBarContext';
import NavBarEmergente from "@/components/ui/NavBarEmergente";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SysProgestion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 flex flex-col">
        <SessionAuthProvider>
          <NavBarProvider>
            <NavBar />
            <NavBarEmergente />
            <div className="flex-grow h-[80%]">
              {children}
            </div>
          </NavBarProvider>
        </SessionAuthProvider>
        <Footer />
      </body>
    </html>
  );
}
