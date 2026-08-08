// ==========================================
// CONFIGURAÇÕES DA AGENDA
// ==========================================

const CONFIGURACOES_PADRAO = {
    diaSemana: 1,          // Segunda-feira
    hora: 16,
    minuto: 0,
    frequencia: "semanal",
    lembrete: 60
};


// ==========================================
// CARREGAR BANCO
// ==========================================

let bancoConsultas = JSON.parse(
    localStorage.getItem("bancoConsultas")
);


// Se ainda não existir, cria o banco

if (!bancoConsultas) {

    bancoConsultas = {

        ...CONFIGURACOES_PADRAO,

        historico: []

    };

    localStorage.setItem(
        "bancoConsultas",
        JSON.stringify(bancoConsultas)
    );

}


// ==========================================
// CARREGAR CONFIGURAÇÕES NA TELA
// ==========================================

function carregarConfiguracoesAgenda() {

    document.getElementById("diaSemana").value =
        bancoConsultas.diaSemana;


    const hora = String(
        bancoConsultas.hora
    ).padStart(2, "0");

    const minuto = String(
        bancoConsultas.minuto
    ).padStart(2, "0");


    document.getElementById(
        "horarioConsulta"
    ).value = `${hora}:${minuto}`;


    document.getElementById(
        "frequencia"
    ).value =
        bancoConsultas.frequencia;


    document.getElementById(
        "lembrete"
    ).value =
        bancoConsultas.lembrete;

}


// ==========================================
// SALVAR CONFIGURAÇÕES
// ==========================================

function salvarConfiguracoesAgenda() {

    const diaSemana =
        Number(
            document.getElementById(
                "diaSemana"
            ).value
        );


    const horario =
        document.getElementById(
            "horarioConsulta"
        ).value;


    const frequencia =
        document.getElementById(
            "frequencia"
        ).value;


    const lembrete =
        Number(
            document.getElementById(
                "lembrete"
            ).value
        );


    // Verifica se o horário foi preenchido

    if (!horario) {

        mostrarMensagem(
            "Escolha um horário para a consulta.",
            "erro"
        );

        return;

    }


    // Separa hora e minuto

    const partes =
        horario.split(":");


    const hora =
        Number(partes[0]);


    const minuto =
        Number(partes[1]);


    // Atualiza o banco

    bancoConsultas.diaSemana =
        diaSemana;

    bancoConsultas.hora =
        hora;

    bancoConsultas.minuto =
        minuto;

    bancoConsultas.frequencia =
        frequencia;

    bancoConsultas.lembrete =
        lembrete;


    // Apaga a próxima consulta antiga
    // para que ela seja recalculada

    delete bancoConsultas.proximaConsulta;


    // Salva

    localStorage.setItem(
        "bancoConsultas",
        JSON.stringify(bancoConsultas)
    );


    mostrarMensagem(
        "Configurações salvas com sucesso! ✅",
        "sucesso"
    );

}


// ==========================================
// MENSAGEM
// ==========================================

function mostrarMensagem(
    texto,
    tipo
) {

    const mensagem =
        document.getElementById(
            "mensagemConfiguracao"
        );


    mensagem.textContent =
        texto;


    mensagem.className =
        "mensagem-configuracao " +
        tipo;


    setTimeout(() => {

        mensagem.textContent = "";

        mensagem.className =
            "mensagem-configuracao";

    }, 3000);

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarConfiguracoesAgenda();

    }
);
