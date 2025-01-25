"use client";

import { JSX, useState } from "react";
import styles from "./styles/page.module.css";
import Text from "./components/text";
import File from "./components/file";
import { manrope700 } from "./styles/fonts";

export default function Home() {
  const [clicouBotao, setClicouBotao] = useState<true | false>(false);
  const [opcaoEscolhida, setOpcaoEscolhida] = useState<string | null>(null);

  const opcoesBotao = ["texto", "imagem"];

  const componentes: Record<string, JSX.Element> = {
    texto: <Text />,
    imagem: <File />,
  };

  return (
    <div className={styles.page}>
      {clicouBotao && <div>{componentes[opcaoEscolhida ?? ""] || null}</div>}

      <div className={styles.botoes}>
        {opcoesBotao.map((opcao) => (
          <button
            key={opcao}
            value={opcao}
            className={`${styles.botao} ${manrope700.className}`}
            onClick={() => {
              setClicouBotao(true);
              setOpcaoEscolhida(opcao);
            }}
          >
            {opcao}
          </button>
        ))}
      </div>
    </div>
  );
}
