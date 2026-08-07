// =====================================
// AGENDA PSICOLÓGICA
// Parte 3C - Script Principal
// =====================================


// Banco de dados local
let banco = JSON.parse(
    localStorage.getItem("agendaPsicologica")
) || {

    humor: [],
    diario: [],
    consultas: [],
    rotina: []

};


// Salvar banco
function salvarBanco(){

    localStorage.setItem(
        "agendaPsicologica",
        JSON.stringify(banco)
    );

}



// =====================================
// SAUDAÇÃO AUTOMÁTICA
// =====================================

function carregarSaudacao(){

    const hora = new Date().getHours();

    let mensagem = "";

    if(hora < 12){

        mensagem = "Bom dia 🌅";

    } 
    else if(hora < 18){

        mensagem = "Boa tarde ☀️";

    }
    else{

        mensagem = "Boa noite 🌙";

    }


    const elemento =
    document.getElementById("saudacao");


    if(elemento){

        elemento.innerHTML = mensagem;

    }


}



// =====================================
// DATA ATUAL
// =====================================

function carregarData(){

    const hoje = new Date();


    const data =
    hoje.toLocaleDateString(
        "pt-BR",
        {
            weekday:"long",
            day:"numeric",
            month:"long",
            year:"numeric"
        }
    );


    const elemento =
    document.getElementById("dataAtual");


    if(elemento){

        elemento.innerHTML = data;

    }

}



// =====================================
// CONTADORES DO PAINEL
// =====================================

function atualizarDashboard(){


    const humor =
    document.getElementById("totalHumor");


    const diario =
    document.getElementById("totalDiario");


    const consultas =
    document.getElementById("totalConsultas");



    if(humor){

        humor.innerHTML =
        banco.humor.length;

    }



    if(diario){

        diario.innerHTML =
        banco.diario.length;

    }



    if(consultas){

        consultas.innerHTML =
        banco.consultas.length;

    }


}



// =====================================
// INICIAR APP
// =====================================

function iniciarApp(){

    carregarSaudacao();

    carregarData();

    atualizarDashboard();

    mostrarUltimoHumor();

    mostrarDiario();

    mostrarConsultas();

}

// Executa quando abrir
document.addEventListener(
    "DOMContentLoaded",
    iniciarApp
);

// =====================================
// REGISTRO DE HUMOR
// =====================================

function registrarHumor(emocao){

    const registro = {

        emocao: emocao,
        data: new Date().toLocaleString("pt-BR")

    };

    banco.humor.unshift(registro);

    salvarBanco();

    atualizarDashboard();

    mostrarUltimoHumor();

}


function mostrarUltimoHumor(){

    const elemento =
    document.getElementById("ultimoHumor");

    if(!elemento) return;

    if(banco.humor.length === 0){

        elemento.innerHTML =
        "Nenhum humor registrado.";

        return;

    }

    const ultimo = banco.humor[0];

    elemento.innerHTML =
        ultimo.emocao +
        "<br><small>" +
        ultimo.data +
        "</small>";

}

// =====================================
// DIÁRIO EMOCIONAL
// =====================================

function salvarDiario(){

    const titulo =
    document.getElementById("tituloDiario").value;


    const texto =
    document.getElementById("textoDiario").value;


    const emocao =
    document.getElementById("emocaoDiario").value;



    if(texto.trim() === ""){

        alert("Escreva como você está se sentindo.");

        return;

    }



    const registro = {

        titulo: titulo,

        texto: texto,

        emocao: emocao,

        data: new Date().toLocaleString("pt-BR")

    };



    banco.diario.unshift(registro);


    salvarBanco();


    atualizarDashboard();


    mostrarDiario();



    document.getElementById("tituloDiario").value = "";

    document.getElementById("textoDiario").value = "";

}



// Mostrar histórico do diário

function mostrarDiario(){


    const lista =
    document.getElementById("listaDiario");


    if(!lista) return;


    lista.innerHTML = "";



    banco.diario.forEach(item => {


        lista.innerHTML += `

        <div class="card-diario">

            <h3>${item.titulo}</h3>

            <p>${item.texto}</p>

            <small>
            ${item.emocao}
            <br>
            ${item.data}
            </small>

        </div>

        `;


    });


}

// =====================================
// AGENDA DE CONSULTAS
// =====================================


function salvarConsulta(){


    const profissional =
    document.getElementById("nomePsicologo").value;


    const data =
    document.getElementById("dataConsulta").value;


    const horario =
    document.getElementById("horaConsulta").value;


    const observacao =
    document.getElementById("obsConsulta").value;



    if(profissional === "" || data === ""){

        alert("Preencha o profissional e a data.");

        return;

    }



    const consulta = {

        profissional: profissional,

        data: data,

        horario: horario,

        observacao: observacao,

        criadaEm: new Date().toLocaleString("pt-BR")

    };



    banco.consultas.unshift(consulta);


    salvarBanco();


    atualizarDashboard();


    mostrarConsultas();



    document.getElementById("nomePsicologo").value="";

    document.getElementById("dataConsulta").value="";

    document.getElementById("horaConsulta").value="";

    document.getElementById("obsConsulta").value="";

}



// Mostrar consultas salvas

function mostrarConsultas(){


    const lista =
    document.getElementById("listaConsultas");


    if(!lista) return;



    lista.innerHTML = "";



    banco.consultas.forEach(item => {


        lista.innerHTML += `

        <div class="card-consulta">

            <h3>🧠 ${item.profissional}</h3>

            <p>
            📅 ${item.data}
            <br>
            ⏰ ${item.horario}
            </p>


            <small>
            ${item.observacao}
            </small>


        </div>

        `;


    });


}
