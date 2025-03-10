module.exports = function parseBody(req){
    return new Promise((resolve, reject) => {
        let body = ""
        req.on("data", (chunk)=>{
            body += chunk.toString()
        })
        req.on("end", ()=>{
            try {
                resolve(JSON.parse(body))
            } catch (error) {
                reject(new Error("Error al parsear el body"))
            }
        })
        req.on("error", (error) => reject(error))
    })
}
