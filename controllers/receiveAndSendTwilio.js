require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT;
const authToken = process.env.TWILIO_TOKEN;
const twilio = require('twilio');
const parseBody = require("../middlewares/parseBody");
const client = new twilio(accountSid, authToken)

exports.receiveAndSendTwilio = async (req, res) => {
    try {
        const body = await parseBody(req);
        console.log(body)
        const numberToReply = body.Author.substring(9) 
        const messageToReply = "hola"
        if(body.Body === "hola"){
            message = "Hola! ¿En qué puedo ayudarte? somos el equipo de Sociedad Aguas del Tucumán"
        }
        const message = await client.messages.create({
            body: messageToReply,
            from: 'whatsapp:+14155238886',
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

