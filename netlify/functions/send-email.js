
const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  // so aceita POST
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Método não permitido." });
  }

  // le os dados que vieram do formulario
  let dados;
  try {
    dados = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Requisição inválida." });
  }

  const name = (dados.name || "").trim();
  const email = (dados.email || "").trim();
  const message = (dados.message || "").trim();

  if (!name || !email || !message) {
    return json(400, { error: "Preencha todos os campos." });
  }

  // checa se o e-mail tem cara de e-mail
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    return json(400, { error: "E-mail inválido." });
  }

  // monta o transporte com os dados que ficam nas variaveis de ambiente
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465, // true so na porta 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // pra qual caixa de entrada vai o contato
  const destino = process.env.CONTACT_TO || process.env.SMTP_USER;

  try {
    await transporter.sendMail({
      from: `"Focusly · Contato" <${process.env.SMTP_USER}>`,
      to: destino,
      replyTo: email,
      subject: `Novo contato pelo site — ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
      html: `
        <h2>Novo contato pelo site Focusly</h2>
        <p><strong>Nome:</strong> ${escapar(name)}</p>
        <p><strong>E-mail:</strong> ${escapar(email)}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${escapar(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return json(200, { ok: true });
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    return json(500, { error: "Falha ao enviar o e-mail. Tente novamente mais tarde." });
  }
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

// evita que texto do usuario quebre o html do e-mail
function escapar(texto) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
