import type { Metadata } from "next";
import "./styles/globals.css";
import Image from "next/image";
import styles from "./styles/page.module.css";
import icon from "@/public/qricon.svg.png";
import { manrope500 } from "./styles/fonts";

export const metadata: Metadata = {
  title: "MyQR",
  description: "Gerador de QR Codes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <header className={styles.header}>
          <h1 className={`${manrope500.className} ${styles.fonte}`}>MyQR</h1>
          <Image src={icon} width={50} height={50} alt="Ícone de um QR Code" />
        </header>
        {children}
      </body>
    </html>
  );
}
