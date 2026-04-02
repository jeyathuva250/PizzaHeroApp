import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit'
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
      <body className={`${outfit.variable} font-sans antialiased bg-[#F7F4F0] dark:bg-brand-dark text-gray-900 dark:text-white overflow-x-hidden transition-colors duration-500`}>
        {children}
      </body>
    </html>
  );
}
