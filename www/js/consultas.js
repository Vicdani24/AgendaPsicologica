// ==========================================
// BANCO DE DADOS DAS CONSULTAS
// ==========================================

const CONFIGURACOES_PADRAO = {
    diaSemana: 1,       // Segunda-feira
    hora: 16,
    minuto: 0,
    frequencia: "semanal",
    lembrete: 60,
    historico: []
};


// ==========================================
// CARREGAR BANCO
// ==========================================

let bancoConsultas = JSON.parse(
    localStorage.getItem("bancoConsultas")
);


if (!bancoConsultas) {

    bancoConsultas = {
        ...CONFIGURACOES_PADRAO
    };

    salvarBancoConsultas();

}


// Garante que campos antigos não causem erro

if (!Array.isArray(bancoConsultas.historico)) {
    bancoConsultas.historico = [];
}

if (bancoConsultas.diaSemana === undefined) {
    bancoConsultas.diaSemana = 1;
}

if (bancoConsultas.hora === undefined) {
    bancoConsultas.hora = 16;
}

if (bancoConsultas.minuto === undefined) {
    bancoConsultas.minuto = 0;
}

if (!bancoConsultas.frequencia) {
    bancoConsultas.frequencia = "semanal";
}

if (bancoConsultas.lembrete === undefined) {
    bancoConsultas.lembrete = 60;
}


// ==========================================
// SALVAR BANCO
// ==========================================

function salvarBancoConsultas() {

    localStorage.setItem(
        "bancoConsultas",
        JSON.stringify(bancoConsultas)
    );

}


// ==========================================
// CALCULAR PRÓXIMA CONSULTA
// ==========================================

function calcularProximaConsulta() {

    const agora = new Date();

    let consulta = new Date();

    consulta.setHours(
        bancoConsultas.hora,
        bancoConsultas.minuto,
        0,
        0
    );


    // ======================================
    // CONSULTA SEMANAL
    // ======================================

    if (bancoConsultas.frequencia === "semanal") {

        let diferenca =
            bancoConsultas.diaSemana -
            consulta.getDay();


        if (diferenca < 0) {
            diferenca += 7;
        }


        // Se for hoje, mas o horário já passou,
        // vai para a próxima semana

        if (
            diferenca === 0 &&
            agora >= consulta
        ) {
            diferenca = 7;
        }


        consulta.setDate(
            consulta.getDate() + diferenca
        );

    }


    // ======================================
    // CONSULTA QUINZENAL
    // ======================================

    else if (
        bancoConsultas.frequencia === "quinzenal"
    ) {

        let diferenca =
            bancoConsultas.diaSemana -
            consulta.getDay();


        if (diferenca < 0) {
            diferenca += 7;
        }


        if (
            diferenca === 0 &&
            agora >= consulta
        ) {
            diferenca = 14;
        }


        consulta.setDate(
            consulta.getDate() + diferenca
        );

    }


    // ======================================
    // CONSULTA MENSAL
    // ======================================

    else if (
        bancoConsultas.frequencia === "mensal"
    ) {

        // Procura a próxima ocorrência
        // do dia da semana escolhido

        let diferenca =
            bancoConsultas.diaSemana -
            consulta.getDay();


        if (diferenca < 0) {
            diferenca += 7;
        }


        if (
            diferenca === 0 &&
            agora >= consulta
        ) {
            diferenca = 7;
        }


        consulta.setDate(
            consulta.getDate() + diferenca
        );


        // Se a ocorrência estiver no mesmo mês
        // e ainda for futura, usamos ela.
        // Caso contrário, procuramos no mês seguinte.

        if (
            consulta <= agora ||
            consulta.getMonth() === agora.getMonth()
        ) {

            let proximoMes =
                new Date(
                    agora.getFullYear(),
                    agora.getMonth() + 1,
                    1,
                    bancoConsultas.hora,
                    bancoConsultas.minuto,
                    0,
                    0
                );


            while (
                proximoMes.getDay() !==
                bancoConsultas.diaSemana
            ) {

                proximoMes.setDate(
                    proximoMes.getDate() + 1
                );

            }


            consulta = proximoMes;

        }

    }


    bancoConsultas.proximaConsulta =
        consulta.toISOString();


    salvarBancoConsultas();


    return consulta;

}


// ==========================================
// FORMATAR DATA
// ==========================================

function formatarData(data) {

    return data.toLocaleDateString(
        "pt-BR"
    );

}


// ==========================================
// PRÓXIMA CONSULTA
// ==========================================

function mostrarProximaConsulta() {

    let consulta;


    if (bancoConsultas.proximaConsulta) {

        consulta = new Date(
            bancoConsultas.proximaConsulta
        );

        // Se a consulta salva já passou,
        // calcula uma nova

        if (consulta <= new Date()) {

            consulta =
                calcularProximaConsulta();

        }

    } else {

        consulta =
            calcularProximaConsulta();

    }


    const hoje = new Date();

    const amanha = new Date();

    amanha.setDate(
        amanha.getDate() + 1
    );


    let texto = "";


    // ======================================
    // HOJE
    // ======================================

    if (
        consulta.toDateString() ===
        hoje.toDateString()
    ) {

        texto = `
            <h3>Hoje às ${String(
                bancoConsultas.hora
            ).padStart(2, "0")}:${String(
                bancoConsultas.minuto
            ).padStart(2, "0")}</h3>
        `;

    }


    // ======================================
    // AMANHÃ
    // ======================================

    else if (
        consulta.toDateString() ===
        amanha.toDateString()
    ) {

        texto = `
            <h3>Amanhã às ${String(
                bancoConsultas.hora
            ).padStart(2, "0")}:${String(
                bancoConsultas.minuto
            ).padStart(2, "0")}</h3>
        `;

    }


    // ======================================
    // OUTROS DIAS
    // ======================================

    else {

        const dias = [
            "Domingo",
            "Segunda-feira",
            "Terça-feira",
            "Quarta-feira",
            "Quinta-feira",
            "Sexta-feira",
            "Sábado"
        ];


        texto = `
            <h3>${dias[consulta.getDay()]}</h3>

            <p>
                ${formatarData(consulta)}
                às
                ${String(
                    bancoConsultas.hora
                ).padStart(2, "0")}:${String(
                    bancoConsultas.minuto
                ).padStart(2, "0")}
            </p>
        `;

    }


    document.getElementById(
        "proximaConsulta"
    ).innerHTML = texto;

}


// ==========================================
// PRÓXIMAS CONSULTAS
// ==========================================

function mostrarProximasConsultas() {

    let primeira =
        bancoConsultas.proximaConsulta
            ? new Date(
                bancoConsultas.proximaConsulta
            )
            : calcularProximaConsulta();


    let lista = "";

    let data =
        new Date(primeira);


    const quantidade = 10;


    for (
        let i = 0;
        i < quantidade;
        i++
    ) {

        lista += `
            <p>
                📅 ${formatarData(data)}
                às
                ${String(
                    bancoConsultas.hora
                ).padStart(2, "0")}:${String(
                    bancoConsultas.minuto
                ).padStart(2, "0")}
            </p>
        `;


        // Próxima ocorrência

        if (
            bancoConsultas.frequencia ===
            "quinzenal"
        ) {

            data.setDate(
                data.getDate() + 14
            );

        }

        else if (
            bancoConsultas.frequencia ===
            "mensal"
        ) {

            // Avança aproximadamente um mês
            // procurando o próximo dia configurado

            let proximoMes =
                new Date(
                    data.getFullYear(),
                    data.getMonth() + 1,
                    1,
                    bancoConsultas.hora,
                    bancoConsultas.minuto
                );


            while (
                proximoMes.getDay() !==
                bancoConsultas.diaSemana
            ) {

                proximoMes.setDate(
                    proximoMes.getDate() + 1
                );

            }


            data = proximoMes;

        }

        else {

            data.setDate(
                data.getDate() + 7
            );

        }

    }


    document.getElementById(
        "listaConsultas"
    ).innerHTML = lista;

}


// ==========================================
// HISTÓRICO
// ==========================================

function mostrarHistorico() {

    let html = "";


    if (
        bancoConsultas.historico.length === 0
    ) {

        html =
            "<p>Nenhuma consulta realizada.</p>";

    }

    else {

        bancoConsultas.historico.forEach(
            data => {

                html += `
                    <p>✅ ${data}</p>
                `;

            }
        );

    }


    document.getElementById(
        "historicoConsultas"
    ).innerHTML = html;

}


// ==========================================
// CARREGAR TELA
// ==========================================

function carregarConsultas() {

    mostrarProximaConsulta();

    mostrarProximasConsultas();

    mostrarHistorico();

    agendarNotificacaoConsulta();

}

// ==========================================
// MARCAR CONSULTA COMO REALIZADA
// ==========================================

function marcarRealizada() {

    const hoje = new Date();


    const dataFormatada =
        hoje.toLocaleDateString(
            "pt-BR"
        );


    // Evita duplicar a mesma consulta

    if (
        !bancoConsultas.historico.includes(
            dataFormatada
        )
    ) {

        bancoConsultas.historico.unshift(
            dataFormatada
        );

    }


    // Calcula a próxima

    calcularProximaConsulta();


    salvarBancoConsultas();


    if (
        confirm(
            "Consulta registrada com sucesso! 🌱\n\n" +
            "Deseja abrir o Diário de Consulta?"
        )
    ) {

        localStorage.setItem(
            "consultaRealizada",
            hoje.toISOString()
        );


        window.location.href =
            "diario-consulta.html";

    }

    else {

        carregarConsultas();

    }

}


// ==========================================
// INICIAR
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarConsultas();

    }
);
