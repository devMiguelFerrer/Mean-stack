const http = require('http');
const app = require('./backend/app'); //  Aqui tendremos toda la logica de express
//  Importamos app para ejecutar el servidor desde la raiz
const PORT = process.env.PORT || 5000;

app.set('port', PORT); // Seteamos el puerto

const server = http.createServer(app); // Creamos el servidor

server.listen(PORT, () => console.log(`Server runing on port: ${PORT}`)); //  Ejecución del servidor
