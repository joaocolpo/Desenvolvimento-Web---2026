# Focusly — Landing Page

Atividade avaliativa do 2º bimestre. Landing page responsiva com componentes
(Navbar, Hero, Recursos, **Preços**, **Contato** e **Footer**) e função de
disparo de e-mail usando **Netlify Functions**.

## Tecnologias

- HTML5 + CSS3 (responsivo) + JavaScript puro
- Netlify Functions (`nodemailer`) para o envio do e-mail de contato

## Estrutura

```
.
├── index.html              # Página com todos os componentes
├── css/styles.css          # Design system + responsividade
├── js/main.js              # Menu mobile + envio do formulário
├── netlify/functions/
│   └── send-email.js       # Função serverless que dispara o e-mail
├── netlify.toml            # Configuração do Netlify
├── package.json
└── .env.example            # Modelo das variáveis de ambiente
```

## Como rodar localmente (com a função de e-mail)

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie o arquivo `.env` a partir do modelo e preencha seus dados SMTP:

   ```bash
   cp .env.example .env
   ```

   > **Gmail:** use uma *Senha de app* (não a senha normal da conta).
   > Ative a verificação em duas etapas e gere em:
   > Conta Google → Segurança → Senhas de app.

3. Suba o ambiente local do Netlify (serve o site **e** as funções):

   ```bash
   npm run dev
   ```

   O site abre em `http://localhost:8888`. O formulário de contato chama
   `/.netlify/functions/send-email`, que envia o e-mail de verdade.

## Visualizar só o layout (sem a função)

Basta abrir o `index.html` no navegador. O formulário só dispara o e-mail
quando rodando com `netlify dev` (ou publicado no Netlify) e com as variáveis
de ambiente configuradas.

## Deploy no Netlify

1. Suba o projeto para um repositório (GitHub/GitLab) e conecte no Netlify, ou
   use `netlify deploy`.
2. No painel do Netlify, em **Site settings → Environment variables**, cadastre:
   `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`.
3. Pronto: a função `send-email` fica disponível em
   `https://SEU-SITE.netlify.app/.netlify/functions/send-email`.
