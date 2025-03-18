const parseBody = require("../middlewares/parseBody");
const fs = require("fs");
const path = require("path");

//devuelve pdf de cada factura y recibe por body numeroFactura
exports.returnPdf = async (req, res) => {
    try {
        const {numeroFactura} = await parseBody(req);
        const nombreArchivo = `res_facturas_vigentes${numeroFactura}.pdf`;
        const rutaArchivo = path.resolve(__dirname, "../cache", nombreArchivo);


        if(!numeroFactura || numeroFactura.length === 0){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({success: "Número de factura no proporcionado"}));
            return; 
        }

        fs.access(rutaArchivo, fs.constants.F_OK, (err) => {
            if(err){
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({success: "PDF no encontrado"}));
                return;
            }
            
            res.writeHead(200, {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${nombreArchivo}"`,
            });

            const stream = fs.createReadStream(rutaArchivo);
            stream.pipe(res);
        });
    } catch (error) {
        console.log("Error al obtener PDF", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ state: "Error al obtener PDF", error: error.message }));
    }
}