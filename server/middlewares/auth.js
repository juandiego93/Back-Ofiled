const jwt = require('jsonwebtoken')
// Verificar Token
let verifyToken = (request, response, next) => {
    let token = request.get('token'), verifyTokenStatus
    try {
        verifyTokenStatus = jwt.verify(token, process.env.SEED)
        if (verifyTokenStatus) {
            request.usuario = verifyTokenStatus.usuario
            next()
        }
    } catch (err) {
        return response.status(500).json({
            ok: false,
            err
        })
    }
}

module.exports = {
    verifyToken
}