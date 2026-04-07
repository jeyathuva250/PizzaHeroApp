import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit'
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pizza Hero - App",
  description: "Delicious Pizza Delivery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} ${playfair.variable} font-sans antialiased bg-[#0B0B0D] dark:bg-brand-dark text-white overflow-x-hidden transition-colors duration-500`}>
        {children}
      </body>
    </html>
  );
}
