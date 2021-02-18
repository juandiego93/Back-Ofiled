//PORT
process.env.PORT = process.env.PORT || 3000

//ENVIROMENT
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//DB
let urlDB = ''
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost/test'
} else {
    urlDB = process.env.MONGO_URI
}
process.env.URLDB = urlDB;

//SEDD de Autenticacion
process.env.SEED = process.env.SEED || 'jU4nd:0s0r10@H0tM41l.c0M'

// Vencimiento Token
// 60 seg * 60 min * 24h * 30d
// process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30
process.env.CADUCIDAD_TOKEN = '48h'
