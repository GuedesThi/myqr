"use client";

import { useEffect, useState } from "react";
import styles from "./text.module.css";
import QRCode from "react-qr-code";
import { manrope400 } from "@/app/styles/fonts";

// Componente com QR Code de texto;
export default function Text() {
  // Para pegarmos o texto que o usuário escrever;
  const [textoEscrito, setTextoEscrito] = useState("");

  useEffect(() => {}, [textoEscrito]);

  return (
    <div>
      <div
        style={{
          background: "white",
          padding: "16px",
          display: "inline-block",
          marginTop: "16px",
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
    </div>
  );
}
