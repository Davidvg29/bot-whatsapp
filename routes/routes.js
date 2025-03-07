const { sendMessage } = require("../controllers/sendMessage");

module.exports = (req, res)=>{
    switch (req.url) {
        case "/send": sendMessage(req, res); break;
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Página no encontrada.");
    }
}