const { LocalNotifications } = Capacitor.Plugins;


// ==========================================
// PEDIR PERMISSÃO
// ==========================================

async function pedirPermissaoNotificacoes() {

    try {

        const permissao =
            await LocalNotifications.checkPermissions();

        if (permissao.display !== "granted") {

            const resultado =
                await LocalNotifications.requestPermissions();

            if (resultado.display !== "granted") {

                console.log(
                    "Permissão para notificações não concedida."
                );

                return false;
            }
        }

        return true;

    } catch (erro) {

        console.error(
            "Erro nas permissões:",
            erro
        );

        return false;
    }
}


// ==========================================
// CANCELAR NOTIFICAÇÃO ANTERIOR
// ==========================================

async function cancelarNotificacaoConsulta() {

    try {

        await LocalNotifications.cancel({
            notifications: [
                {
                    id: 2001
                }
            ]
        });

    } catch (erro) {

        console.log(
            "Nenhuma notificação anterior para cancelar."
        );

    }

}


// ==========================================
// AGENDAR NOTIFICAÇÃO DA CONSULTA
// ==========================================

async function agendarNotificacaoConsulta() {

    try {

        const permitido =
            await pedirPermissaoNotificacoes();

        if (!permitido) {

            console.log(
                "Notificações não autorizadas."
            );

            return;

        }


        const banco =
            JSON.parse(
                localStorage.getItem(
                    "bancoConsultas"
                )
            );


        if (
            !banco ||
            !banco.proximaConsulta
        ) {

            console.log(
                "Nenhuma próxima consulta encontrada."
            );

            return;

        }


        const consulta =
            new Date(
                banco.proximaConsulta
            );


        // ======================================
        // CALCULAR HORÁRIO DO AVISO
        // ======================================

        const minutosAntes =
            Number(
                banco.lembrete || 60
            );


        const horarioNotificacao =
            new Date(
                consulta.getTime()
                -
                minutosAntes * 60 * 1000
            );


        // Não agenda notificações que já passaram

        if (
            horarioNotificacao <= new Date()
        ) {

            console.log(
                "Horário da notificação já passou."
            );

            return;

        }


        // ======================================
        // CANCELAR ANTERIOR
        // ======================================

        await cancelarNotificacaoConsulta();


        // ======================================
        // AGENDAR NOVA
        // ======================================

        await LocalNotifications.schedule({

            notifications: [

                {

                    id: 2001,

                    title:
                        "📅 Próxima Consulta",

                    body:
                        `Sua consulta será às ${String(
                            consulta.getHours()
                        ).padStart(2, "0")}:${String(
                            consulta.getMinutes()
                        ).padStart(2, "0")}.`,

                    schedule: {

                        at:
                            horarioNotificacao

                    },

                    smallIcon:
                        "ic_launcher_foreground",

                    sound:
                        "default"

                }

            ]

        });


        console.log(
            "Notificação agendada para:",
            horarioNotificacao
        );


    } catch (erro) {

        console.error(
            "Erro ao agendar notificação:",
            erro
        );

    }

}
