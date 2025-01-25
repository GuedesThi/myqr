"use client";

import { useRef, useState } from "react";
import styles from "./file.module.css";
import QRCode from "react-qr-code";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { manrope400, manrope500, manrope600 } from "@/app/styles/fonts";

const supabaseUrl = "https://hewhxgumwoktieolpqxz.supabase.co";

if (!process.env.NEXT_PUBLIC_SUPABASE_KEY) {
  throw new Error(
    "Nenhuma chave foi informada para se conectar com o Supabase"
  );
}

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default function File() {
  const [urlGerada, setUrlGerada] = useState<string | null>(null);
  const [statusDoUpload, setStatusDoUpload] = useState<string>("");
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const fazerUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0];
    if (!arquivo) {
      return;
    }

    setStatusDoUpload("Carregando...");

    const { error } = await supabase.storage
      .from("arquivos-qrcode")
      .upload(`uploads/${arquivo.name}`, arquivo, { upsert: true });

    if (error) {
      setStatusDoUpload("Erro ao fazer upload: " + error.message);
      return;
    }

    const { data } = supabase.storage
      .from("arquivos-qrcode")
      .getPublicUrl(`uploads/${arquivo.name}`);

    if (data?.publicUrl) {
      setUrlGerada(data.publicUrl);
      setStatusDoUpload("");
    } else {
      setStatusDoUpload("Erro ao obter URL pública");
    }
  };

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
      {urlGerada && (
        <div
          ref={qrCodeRef}
          style={{
            padding: "16px",
            display: "inline-block",
            marginTop: "-4rem",
          }}
        >
          <QRCode value={urlGerada} size={256} />
        </div>
      )}

      <div className={styles.inputContainer}>
        <input className={styles.input} type="file" onChange={fazerUpload} />
      </div>

      {statusDoUpload && (
        <p className={`${styles.status} ${manrope500.className}`}>
          {statusDoUpload}
        </p>
      )}

      {urlGerada && (
        <div className={styles.buttonContainer}>
          <button
            onClick={baixarQRCode}
            className={`${styles.downloadButton} ${manrope600.className}`}
          >
            Baixar QR Code
          </button>
        </div>
      )}
    </div>
  );
}
