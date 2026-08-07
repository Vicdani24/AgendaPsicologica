let cadastro = JSON.parse(
localStorage.getItem("cadastro")
) || {};

function salvarCadastro(){

cadastro.nome =
document.getElementById("nome").value;

cadastro.idade =
document.getElementById("idade").value;

cadastro.nascimento =
document.getElementById("nascimento").value;

cadastro.sexo =
document.getElementById("sexo").value;

cadastro.objetivo =
document.getElementById("objetivo").value;

localStorage.setItem(
"cadastro",
JSON.stringify(cadastro)
);

alert("Cadastro salvo com sucesso!");

}

function carregarCadastro(){

cadastro = JSON.parse(
localStorage.getItem("cadastro")
);

if(!cadastro) return;

document.getElementById("nome").value =
cadastro.nome || "";

document.getElementById("idade").value =
cadastro.idade || "";

document.getElementById("nascimento").value =
cadastro.nascimento || "";

document.getElementById("sexo").value =
cadastro.sexo || "";

document.getElementById("objetivo").value =
cadastro.objetivo || "";

}

document.addEventListener(
"DOMContentLoaded",
carregarCadastro
);
