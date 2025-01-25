"use client";

import { useRef, useState } from "react";
import styles from "./text.module.css";
import QRCode from "react-qr-code";
import { manrope400, manrope600 } from "@/app/styles/fonts";

export default function Text() {
  const [textoEscrito, setTextoEscrito] = useState("");
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const baixarQRCode = () => {
    if (!qrCodeRef.current) return;

    const svg = qrCodeRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = "qrcode.png";
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div>
      <div
        ref={qrCodeRef}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "white",
          padding: "7px",
        }}
      >
        <QRCode value={textoEscrito} size={256} />
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          className={`${styles.input} ${manrope400.className}`}
          value={textoEscrito}
          onChange={(e) => setTextoEscrito(e.target.value)}
          placeholder="Digite algo"
        />
      </div>

      <div className={styles.buttonContainer}>
        <button
          onClick={baixarQRCode}
          className={`${styles.downloadButton} ${manrope600.className}`}
        >
          Baixar QR Code
        </button>
      </div>
    </div>
  );
}
