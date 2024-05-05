import type { Metadata } from "next";
import "./globals.css";

import Providers from "./Providers";
import InnerLayout from "./InnerLayout";

// components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import {
  Public_Sans,
  Noto_Sans_Display,
  Nunito_Sans,
  Poppins,
  Open_Sans,
  Jost,
} from "next/font/google";

const font_family = Noto_Sans_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jooble-Nextjs-Nodejs",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        suppressContentEditableWarning
        //className={font_family.className}
      >
        <Providers>
          <Header />
          <InnerLayout>
            {children}
            <Footer />
          </InnerLayout>
        </Providers>
      </body>
    </html>
  );
}
