<!--This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).-->

## Estrutura inicial
Após criar um projeto base com `next.js` (`typescript + app router`), defini a seguinte estrutura, onde cada componente é responsável por cada tipo de qr code (texto, arquivo, imagem, vídeo, áudio)

```python
📂 (root)
|
|--📂 (app)
|  |
|  |---📂 (components)
|  |   |
|  |   |----📂 (text)
|  |   |----📂 (file)
|  |   |----📂 (image)
|  |   |----📂 (video)
|  |   |----📂 (audio)
|  |
|  |---📄layout.tsx
|  |---📄page.tsx
|  |---📂 (styles)
|
...
```

## Página inicial

A aplicação só terá uma única página, onde dependendo da opção de qr code que escolhermos, será retornado um componente específico na tela:
```tsx
...

export default function Home() {
  const [clicouBotao, setClicouBotao] = useState<true | false>(false);
  const [opcaoEscolhida, setOpcaoEscolhida] = useState<string | null>(null);

  const opcoesBotao = ["texto", "arquivo", "imagem", "vídeo", "áudio"];

  const componentes: Record<string, JSX.Element> = {
    texto: <Text />,
    arquivo: <File />,
    imagem: <Image />,
    vídeo: <Video />,
    áudio: <Audio />,
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
 
```
### QR Code para textos
---
Foi necessário instalar apenas o `react-qr-code`, que transforma qualquer texto num qr code:
```bash
npm install react-qr-code
```

Após isso, dentro do componente `<Text>`, tive que importar o componente `<QRCode>` para ter um qr code em tela, onde passei pra ele tudo o que o usuário escreve em tempo real num input, e defini um tamanho pro qr code dentro do seu componente:
```tsx
...
import QRCode from "react-qr-code";

export default function Text() {
  const [textoEscrito, setTextoEscrito] = useState("");

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
```

### QR Code para arquivos
---
Aqui eu também posso usar o `react-qr-code` para gerar meu qr code, mas tem um problema. Para um arquivo virar um qr code, existem dois possíveis caminhos: 
- `Menos recomendado`: podemos transformar o arquivo numa <b>string representativa</b> (<i>base64</i>), e depois transformar essa <b>string</b> num qr code. Mas isso não é muito comum, pois se o conteúdo do arquivo (após ser convertido pra <b>string</b>) for grande, ele pode exceder a quantidade de informações que um qr code pode armazena`, dando um erro;
- `Recomendado`: quando o usuário fazer o upload de um arquivo, mandamos ele para algum serviço online de armazenamento (ex: <b>Firebase Storage</b>, <b>Amazon S3</b>, etc.), pegamos a URL gerada e transformamos essa URL num qr code;

<br>
Pra isso eu preferi usar o <b>Supabase</b>, que nos permite usar seus serviços de armazenamento de forma gratuíta.

<br>

Pra ligar o meu componente `<File>` com o <b>Supabase</b>, eu tive que:

1. Criar uma conta no site do <b>Supabase</b>, e depois criei um <b>banco de dados</b>;

2. Ao abrir o <b>banco</b>, cliquei na opção de <b>Storage</b>, depois em <b>New bucket</b>, e coloquei ele como público para qualquer um ter acesso;

3. Fui em <b>Settings</b> e copiei os valores em <b>URL</b> e <b>API Key public</b>;

4. Voltei pro `next.js` e instalei um <b>client</b> para acessar o <b>Supabase</b>:
```bash 
npm install @supabase/supabase-js
```