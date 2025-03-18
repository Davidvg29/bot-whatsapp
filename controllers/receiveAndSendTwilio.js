require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT;
const authToken = process.env.TWILIO_TOKEN;
const twilio = require('twilio');
const parseBody = require("../middlewares/parseBody");
const { crearArchivoRemoto, leerArchivoRemotoTes, leerArchivoRemotoTxt, getFacturasVigentesSAT } = require("../middlewares/funcionesAccesoRemoto");
const client = new twilio(accountSid, authToken)

exports.receiveAndSendTwilio = async (req, res) => {
    try {
        const body = await parseBody(req);
        console.log(body)
        const numberToReply = body.From.substring(9) 
        let messageToReply = "hola"
        if(body.Body === "hola" || body.Body === "Hola" || body.Body === "HOLA" || body.Body === "holaa" || body.Body === "Holaa" || body.Body === "HOLAA"){
            messageToReply = `¡Hola, *${body.ProfileName}*! 👋  
Bienvenido/a al sistema de Atención al Cliente de *SAT - Sociedad Aguas del Tucumán* 💧👩🏻‍💼👨🏻‍💼  

Para brindarte una mejor atención, en algunos casos te pediremos tu *código de cliente*.  

Por favor, responde con el número de la opción que mejor describa tu consulta: 🔢  

1️⃣ *Solicitud Técnica*  
2️⃣ *Solicitud Administrativa*  
3️⃣ *Consulta de últimas facturas*  

👉 *Escribe solo el número de la opción elegida.*  
`
        }
        else if(body.Body === "3"){
            messageToReply = `Para consultar tus últimas facturas, por favor, ingresá tu *código de cliente*. 📄🔍`
        }
        else if(body.Body.length === 8){
            const sol = await crearArchivoRemoto(body.Body)
            if(!sol){ return messageToReply = "Ocurrió un error, intente más tarde."}
            const tes = await leerArchivoRemotoTes(body.Body)
            if(!tes || tes === "0001"){ return messageToReply = "No tienes facturas vigentes en este momento."}
            const txt = await leerArchivoRemotoTxt(body.Body)
            console.log(typeof txt)
            console.log(txt)
            let arrayNumFactura = []
            for (let i = 0; i < txt.length; i++) {
                if(txt[i] !== ""){
                    arrayNumFactura.push(txt[i].substring(16, 28))
                    await getFacturasVigentesSAT(txt[i].substring(16, 28))
                }
            }
            for (let i = 0; i < arrayNumFactura.length; i++) {
                const message = await client.messages.create({
                    body: `Factura ${arrayNumFactura[i]}`,
                    from: 'whatsapp:+14155238886',
                    mediaUrl: `https://e510-181-10-202-251.ngrok-free.app/cache/res_facturas_vigentes${arrayNumFactura[i]}.pdf`,
                    to: `whatsapp:${numberToReply}`
                });
                console.log(message)
            }
        }
        const message = await client.messages.create({
            body: messageToReply,
            from: 'whatsapp:+14155238886',
            // mediaUrl: "https://e510-181-10-202-251.ngrok-free.app/cache/res_facturas_vigentes001031106082.pdf",
            to: `whatsapp:${numberToReply}`
        });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ state: "Success" }));

    } catch (error) {
        console.log("Error enviando mensaje:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ state: "Unsuccessful", error: error.message }));
    }
};


