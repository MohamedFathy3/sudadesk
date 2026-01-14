import type { Metadata } from "next";
import "@plugin_css/animate.min.css";
import "@plugin_css/bootstrap.min.css";
import "@plugin_css/icofont.css";
import "@plugin_css/maginific-popup.min.css";
import "@plugin_css/nice-select.min.css";
import "@plugin_css/swiper-bundle.min.css";
import "@plugin_css/uicons.css";
import "@css/style.css"
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--ed-font-family",
});

export const metadata: Metadata = {
  title: "Eduna - Online Education Courses React NextJS Template",
  description: "Eduna - Online Education Courses React NextJS Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        {children}
      </body>
    </html>
  );
}
