// menu que abre e fecha no celular
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const aberto = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(aberto));
    toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  // fecha o menu quando clica num link
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// envio do formulario de contato
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // usa a validacao do proprio HTML
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const dados = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    mostrarStatus("Enviando...", "");
    submitBtn.disabled = true;

    try {
      const resposta = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      const resultado = await resposta.json().catch(() => ({}));

      if (resposta.ok) {
        mostrarStatus("Mensagem enviada com sucesso! Em breve entraremos em contato.", "is-success");
        form.reset();
      } else {
        mostrarStatus(resultado.error || "Não foi possível enviar. Tente novamente.", "is-error");
      }
    } catch (err) {
      mostrarStatus("Erro de conexão. Verifique sua internet e tente novamente.", "is-error");
    } finally {
      submitBtn.disabled = false;
    }
  });
}

function mostrarStatus(mensagem, classe) {
  if (!status) return;
  status.textContent = mensagem;
  status.className = "form-status" + (classe ? " " + classe : "");
}
