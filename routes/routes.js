const { receiveAndSendTwilio } = require("../controllers/receiveAndSendTwilio");
const { sendMessage } = require("../controllers/sendMessage");
const { sendMessageTwilio } = require("../controllers/sendMessageTwilio");

module.exports = (req, res)=>{
    if(req.method === "GET"){
        switch (req.url) {
            case "/send": sendMessage(req, res); break;
            case "/sendTwilio": sendMessageTwilio(req, res); break;
            default:
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify("Página no encontrada."));
        }
    }
     else if(req.method === "POST"){
        switch (req.url) {
            case "/receiveAndSendTwilio": receiveAndSendTwilio(req, res); break;
            default:
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify("Página no encontrada."));
        }
    }
    else{
        res.writeHead(404, {"Content-type": "application/json"})
        res.end("Página no encontrada")
    }
}