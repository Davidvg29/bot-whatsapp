module.exports = function parseBody(req){
    return new Promise((resolve, reject) => {
        let body = ""
        req.on("data", (chunk)=>{
            body += chunk.toString()
        })
        req.on("end", ()=>{
            try {
                const contentType = req.headers["content-type"]
                if(contentType.includes("application/json")){
                    resolve(JSON.parse(body))
                }
                else if(contentType.includes("application/x-www-form-urlencoded")){
                    const parsedBody = new URLSearchParams(body);
                    const result = {};
                    for (const [key, value] of parsedBody.entries()) {
                        result[key] = value;
                    }
                    resolve(result)
                }
            } catch (error) {
                reject(new Error("Error al parsear el body"))
            }
        })
        req.on("error", (error) => reject(error))
    })
}
