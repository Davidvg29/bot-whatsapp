const { Client } = require('ssh2');

exports.connectSSH = async () => {
    try {
        const conn = new Client();
        return await new Promise((resolve, reject) => {
            conn.on('ready', () => {
                console.log('✅ Conexión SSH establecida');
                resolve(conn);
            }).on('error', (err) => {
                console.error('❌ Error de conexión SSH:', err);
                reject(err);
            }).connect({
                host: '150.150.150.13', 
                port: 22, 
                username: 'lucas_test', 
                password: 'Test2024' 
            });
        });
    } catch (error) {
        console.error('❌ Error general de SSH:', error);
        throw error;
    }
}

exports.crearArchivoRemoto = async (identificacionClienteCodigo) => {
    let conn;
    try {
        conn = await exports.connectSSH();
        let command = `mkdir -p /Solicitud && echo "${identificacionClienteCodigo}" > /Solicitud/sol_facturas_vigentes${identificacionClienteCodigo}`;
        await new Promise((resolve, reject) => {
            conn.exec(command, (err, stream) => {
                if (err) {
                    reject(err);  // Rechazar si hay error en la ejecución
                    return;
                }
                // Cuando el comando termine
                stream.on('close', (code) => {
                    console.log(`✅ Archivo creado con código de salida: ${code}`);
                    resolve();
                });
                // Mostrar la salida estándar, los datos (STDOUT)
                stream.on('data', (data) => {
                    console.log('STDOUT: ' + data);
                });
                // Mostrar los errores (STDERR)
                stream.stderr.on('data', (data) => {
                    console.error('STDERR: ' + data);
                });
            });
        });
    } catch (error) {
        console.error('❌ Error al crear el archivo:', error);
    } finally {
        if (conn) conn.end(); //cierra conexión
    }
}

exports.leerArchivoRemotoTest = async (identificacionClienteCodigo) => {
    let conn;
    let fileContent = ''; // Asegúrate de inicializar fileContent
    try {
        let command = `cat /Respuesta/res_facturas_vigentes${identificacionClienteCodigo}.tes`;
        conn = await exports.connectSSH();
        
        // Usamos la promesa para manejar la ejecución del comando SSH
        await new Promise((resolve, reject) => {
            conn.exec(command, (err, stream) => {
                if (err) {
                    reject(err);  // Rechazar si hay error en la ejecución
                    return;
                }

                // Capturamos la salida estándar (STDOUT)
                stream.on('data', (data) => {
                    console.log('STDOUT: ' + data);  // Ver qué datos estamos recibiendo
                    fileContent += data.toString();
                });
                // Al cerrar el flujo, resolvemos la promesa
                stream.on('close', (code) => {
                    console.log(`✅ Archivo leído con éxito`);
                    resolve();  // Resolvemos la promesa
                });
                // Capturamos los errores (STDERR)
                stream.stderr.on('data', (data) => {
                    console.error('STDERR: ' + data);
                });
            });
        });
    } catch (error) {
        console.error('❌ Error al leer el archivo:', error);
        return false; // Si ocurre un error, retornamos false
    } finally {
        if (conn) conn.end(); // Cerramos la conexión SSH
    }
};
