const QRCode = require('qrcode');

// El contenido que deseas codificar en el código QR

exports.generatedQr = async (data) => {
    const url = `https://www.aguasdeltucuman.com.ar/${data}`;
    console.log("url-qr: ", url)
    // Generar el código QR y guardarlo como una imagen PNG
    QRCode.toFile(`codigoQR${data}.png`, url, function (err) {
        if (err) throw err;
        console.log('¡Código QR generado y guardado como "codigoQR.png"!');
    });
}