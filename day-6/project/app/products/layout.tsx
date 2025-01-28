import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import { CartProvider } from "./context/CartContext";
import TopHeader from "@/components/TopHeader";
import Footer from "@/components/Footer";
 
 
export const metadata: Metadata = {
  title: "My Nike Store ",
  description: "My Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` `}
      >
        <CartProvider>
        <TopHeader/>
        <Header />
        {children}
        <Footer/>
        </CartProvider>
      </body>
    </html>
  );
}