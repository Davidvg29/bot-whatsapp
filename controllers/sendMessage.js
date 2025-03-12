const axios = require("axios");
const parseBody = require("../middlewares/parseBody");
require('dotenv').config();

const token = process.env.WHATSAPP_TOKEN;
exports.sendMessage = async(req, res) => {
    try {
        const body = await parseBody(req)
        console.log(body)
        const data = {
            "messaging_product": "whatsapp",
            "to": "543813965671",
            "type": "text",
            "text": {
                  "body": "body.message"
              }
          }      

        await axios.post("https://graph.facebook.com/v22.0/569623499570416/messages", data,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
        })
    
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify("Mensaje enviado con exito"));
    } catch (error) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify("Ocurrio un error al enviar el mensaje mediante WhatsApp"));
    }
};
  