const { getPdf } = require("../controllers/getPdf");
const { receiveAndSendTwilio } = require("../controllers/receiveAndSendTwilio");
const { sendMessageTwilio } = require("../controllers/sendMessageTwilio");
const {crearArchivoRemoto, leerArchivoRemotoTes, getFacturasVigentesSAT, leerArchivoRemotoTxt} = require("../middlewares/funcionesAccesoRemoto")

module.exports = async (req, res)=>{
    if(req.method === "GET"){
        switch (req.url) {
            case "/a": getFacturasVigentesSAT("001031392805"); break;
            case "/sendTwilio": sendMessageTwilio(req, res); break;
            case "/cache": getPdf(req, res); break;
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