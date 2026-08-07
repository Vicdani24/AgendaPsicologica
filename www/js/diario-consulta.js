let consultas =
JSON.parse(localStorage.getItem("diarioConsulta")) || [];

function salvarConsultaDiario(){

const consulta={

data:document.getElementById("dataConsulta").value,

psicologo:document.getElementById("psicologo").value,

tema:document.getElementById("tema").value,

antes:document.getElementById("antes").value,

durante:document.getElementById("durante").value,

tarefas:document.getElementById("tarefas").value,

depois:document.getElementById("depois").value

};

consultas.unshift(consulta);

localStorage.setItem(
"diarioConsulta",
JSON.stringify(consultas)
);

mostrarConsultas();

alert("Consulta salva com sucesso!");

}

function mostrarConsultas(){

const div=
document.getElementById("historicoConsultas");

div.innerHTML="";

consultas.forEach(item=>{

div.innerHTML+=`

<div class="card">

<h3>${item.data}</h3>

<p><strong>Tema:</strong> ${item.tema}</p>

<p><strong>Psicólogo:</strong> ${item.psicologo}</p>

</div>

`;

});

}

mostrarConsultas();
