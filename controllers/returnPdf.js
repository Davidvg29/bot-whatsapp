const fs = require("fs");
const path = require("path");

// Devuelve el PDF de la factura basado en la URL
exports.returnPdf = async (req, res) => {
    try {
        // Extraer el número de factura de la URL
        // Suponemos que la URL tiene el formato /cache/res_facturas_vigentes{numeroFactura}.pdf
        const urlParts = req.url.split('/');
        const fileName = urlParts[urlParts.length - 1]; // Ejemplo: res_facturas_vigentes12345.pdf

        // Extraemos el número de factura (asumiendo que el formato es siempre 'res_facturas_vigentes' seguido del número)
        const numeroFactura = fileName.replace('res_facturas_vigentes', '').replace('.pdf', '');

        if (!numeroFactura || numeroFactura.length === 0) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: "Número de factura no proporcionado" }));
            return;
        }

        // Construir la ruta del archivo en el servidor
        const nombreArchivo = `res_facturas_vigentes${numeroFactura}.pdf`;
        const rutaArchivo = path.resolve(__dirname, "../cache", nombreArchivo);

        // Verificar si el archivo existe
        fs.access(rutaArchivo, fs.constants.F_OK, (err) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: "PDF no encontrado" }));
                return;
            }

            // Si el archivo existe, se envía como respuesta
            res.writeHead(200, {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${nombreArchivo}"`, // O 'inline' si prefieres mostrarlo en el navegador
            });

            // Crear un stream de lectura del archivo y enviarlo al cliente
            const stream = fs.createReadStream(rutaArchivo);
            stream.pipe(res);

            // Manejar el fin del stream
            stream.on('end', () => {
                res.end();
            });

            // Manejar posibles errores durante la lectura
            stream.on('error', (err) => {
                console.error("Error al leer el archivo:", err);
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: "Error al leer el archivo PDF", error: err.message }));
            });
        });
    } catch (error) {
        console.log("Error al obtener PDF", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ state: "Error al obtener PDF", error: error.message }));
    }
};
