function carregarPerfil(){

const cadastro =
JSON.parse(localStorage.getItem("cadastro"));

if(!cadastro) return;

document.getElementById("perfilNome").textContent =
cadastro.nome || "Usuário";

document.getElementById("perfilIdade").textContent =
cadastro.idade || "-";

document.getElementById("perfilNascimento").textContent =
cadastro.nascimento || "-";

document.getElementById("perfilSexo").textContent =
cadastro.sexo || "-";

document.getElementById("perfilObjetivo").textContent =
cadastro.objetivo || "Nenhum objetivo informado.";

}

document.addEventListener(
"DOMContentLoaded",
carregarPerfil
);
