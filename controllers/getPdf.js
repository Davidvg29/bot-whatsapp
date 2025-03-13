exports.getPdf = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error al obtener PDF", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ state: "Error al obtener PDF", error: error.message }));
    }
}