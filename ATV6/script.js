const input = document.getElementById("tarefaInput");
const botao = document.getElementById("addBtn");
const lista = document.getElementById("lista");

// Adicionar tarefa
botao.addEventListener("click", () => {
  const texto = input.value.trim();

  if (texto !== "") {
    const li = document.createElement("li");
    li.textContent = texto;

    lista.appendChild(li);
    input.value = "";
  }
});

// Remover tarefa (delegação de eventos)
lista.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.remove();
  }
});