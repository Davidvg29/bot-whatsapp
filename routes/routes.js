const { receiveAndSendTwilio } = require("../controllers/receiveAndSendTwilio");
const { sendMessageTwilio } = require("../controllers/sendMessageTwilio");
const {crearArchivoRemoto, leerArchivoRemotoTest} = require("../middlewares/funcionesAccesoRemoto")

module.exports = (req, res)=>{
    if(req.method === "GET"){
        switch (req.url) {
            case "/a": leerArchivoRemotoTest("19225412"); break;
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