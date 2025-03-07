const axios = require("axios")
require('dotenv').config();

exports.sendMessage = async(req, res) => {
    const token = process.env.WHATSAPP_TOKEN;
    try {
        const data = {
            "messaging_product": "whatsapp",
            "to": "543813965671",
            "type": "text",
            "text": {
                  "body": "Hola, este es un mensaje probando la api de whatsapp enviado con Node.js"
              }
          }      

        axios.post("https://graph.facebook.com/v22.0/569623499570416/messages", data,{
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
  