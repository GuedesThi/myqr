"use client";

import { useState } from "react";
import styles from "./styles/page.module.css";
import Text from "./components/text";
import File from "./components/file";
import Image from "./components/image";
import Video from "./components/video";
import Audio from "./components/audio";
import { manrope700 } from "./styles/fonts";

export default function Home() {
  // Saber se o usuário clicou em algum dos botões de opção de QR Code;
  const [clicouBotao, setClicouBotao] = useState<true | false>(false);
  // Saber em qual botão ele clicou;
  const [opcaoEscolhida, setOpcaoEscolhida] = useState<string | null>(null);

  const opcoesBotao = ["texto", "arquivo", "imagem", "vídeo", "áudio"];

  // Retorna o componente de acordo com o botão que o usuário clicou;
  const qrcodeEscolhido = () => {
    switch (opcaoEscolhida) {
      case "texto":
        return <Text />;
      case "arquivo":
        return <File />;
      case "imagem":
        return <Image />;
      case "vídeo":
        return <Video />;
      case "áudio":
        return <Audio />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      {/* O componente só aparece após 'clicouBotao = true', e 'qrcodeEscolhido' retornar algo; */}
      {clicouBotao && <div>{qrcodeEscolhido()}</div>}

      <div className={styles.botoes}>
        {/* 'map' para retornar todas as opções de botões possíveis; */}
        {opcoesBotao.map((opcao) => (
          <button
            key={opcao}
            value={opcao}
            className={`${styles.botao} ${manrope700.className}`}
            // Ao clicar no botão, 'clicouBotao' e 'opcaoEscolhida' são atualizados;
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
