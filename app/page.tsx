import Image from "next/image";
import styles from "./page.module.css";
import icon from "@/public/qricon.svg.png";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  weight: "500",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={`${manrope.className} ${styles.fonte}`}>My</h1>
        <Image src={icon} width={50} height={50} alt="Ícone de um QR Code" />
      </header>
    </div>
  );
}
