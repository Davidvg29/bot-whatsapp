const fs = require("fs")
const parseBody = require("../middlewares/parseBody")

const pdfjsLib = require("pdfjs-dist");
//const pdfjsLib = require("pdfjs-dist/legacy/build/pdf");


exports. readFacturaPDF = async (req, res) => {
    const body = await parseBody(req)
    console.log("body: ", body)

    const loadingTask = pdfjsLib.getDocument(`..\\pruebas\\cache\\res_facturas_vigentes${body.numeroFactura}.pdf`);
    const pdf = await loadingTask.promise;
    let text = "";

    let data = []

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        //text += content.items.map((item) => item.str).join(" ") + "\n";
    
    let currentLine = "";
        let lastY = null;

        content.items.forEach((item) => {
            //console.log(item)
            // Si la posición Y cambia, significa que estamos en una nueva línea
            if (lastY !== null && item.transform[5] !== lastY) {
                // Se agrega la línea cuando cambia la Y
                text += currentLine + "\n";
                currentLine = item.str; // Se comienza una nueva línea
            } else {
                // Si la Y es la misma, agregamos el texto a la línea actual
                currentLine += item.str + " ";
            }
            lastY = item.transform[5]; // Se actualiza la última posición Y
        });

        // Agregar la última línea
        text += currentLine + "\n";

    }

// Dividir el texto en líneas usando el salto de línea como delimitador
const lineas = text.split('\n');

// Iterar sobre cada línea y agregarla al array
lineas.forEach(linea => {
    data.push(linea);
});
    console.log(text);

    console.log(data)
    let dataServible = []
    dataServible.push(data[11])
    dataServible.push(data[12])
    dataServible.push(data[13])
    dataServible.push(data[14])
    dataServible.push(data[15])
    dataServible.push(data[18])
    dataServible.push(data[19])
    dataServible.push(data[21])

    console.log(dataServible)

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ state: "Success" }));

}
