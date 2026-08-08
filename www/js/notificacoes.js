const { LocalNotifications } = Capacitor.Plugins;


// ==========================================
// PEDIR PERMISSÃO PARA NOTIFICAÇÕES
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
            "Erro ao solicitar permissão:",
            erro
        );

        return false;
    }
}


// ==========================================
// TESTE DE NOTIFICAÇÃO
// ==========================================

async function testarNotificacao() {

    const permitido =
        await pedirPermissaoNotificacoes();

    if (!permitido) {

        alert(
            "A permissão para notificações não foi concedida."
        );

        return;
    }


    await LocalNotifications.schedule({

        notifications: [

            {
                title: "📅 Agenda Psicológica",

                body: "As notificações estão funcionando! ✅",

                id: 1001

            }

        ]

    });

}
