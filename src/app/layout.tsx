import type { Metadata } from "next";
import Auth from './universal-components/Auth'
import "./globals.css";

export const metadata: Metadata = {
  title: "Tally App",
  description: "In the Lab...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Auth>
          {children}

        </Auth>
        
      </body>
    </html>
  );
}
