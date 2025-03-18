const { returnPdf } = require("../controllers/returnPdf");
const { receiveAndSendTwilio } = require("../controllers/receiveAndSendTwilio");
const { sendMessageTwilio } = require("../controllers/sendMessageTwilio");
const {crearArchivoRemoto, leerArchivoRemotoTes, getFacturasVigentesSAT, leerArchivoRemotoTxt} = require("../middlewares/funcionesAccesoRemoto");

module.exports = async (req, res) => {
    if (req.method === "GET") {
        const urlParts = req.url.split('/');
        
        // Si la ruta es de tipo /cache/res_facturas_vigentes12345.pdf
        if (urlParts[1] === 'cache' && urlParts[2] && urlParts[2].endsWith('.pdf')) {
            // Extraemos el número de factura de la URL
            const fileName = urlParts[2];  // Ejemplo: res_facturas_vigentes12345.pdf
            const numeroFactura = fileName.replace('res_facturas_vigentes', '').replace('.pdf', '');

            // Llamamos a la función para devolver el PDF
            returnPdf(req, res, numeroFactura);
            return;
        }

        switch (req.url) {
            case "/sendTwilio":
                sendMessageTwilio(req, res);
                break;
            default:
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify("Página no encontrada."));
        }
    } else if (req.method === "POST") {
        switch (req.url) {
            case "/receiveAndSendTwilio":
                receiveAndSendTwilio(req, res);
                break;
            default:
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify("Página no encontrada."));
        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end("Página no encontrada");
    }
};
