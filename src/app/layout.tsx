import type { Metadata } from "next";
import Auth from './universal-components/Auth'
import "./globals.css";

export const metadata: Metadata = {
  title: "Tally",
  description: "In the Lab...",
  icons: {
    icon: '/tallylogo.svg',
    shortcut: '/tallylogo.svg',
    apple: '/tallylogo.svg',
  },
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
