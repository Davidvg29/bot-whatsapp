require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT;
const authToken = process.env.TWILIO_TOKEN;
const twilio = require('twilio');
const client = new twilio(accountSid, authToken)

exports.sendMessageTwilio = async (req, res) => {
    try {
        const message = await client.messages.create({
            body: 'probando twilio en node',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+5493813965671'
        });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ state: "Success" }));

    } catch (error) {
        console.log("Error enviando mensaje:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ state: "Unsuccessful", error: error.message }));
    }
};
