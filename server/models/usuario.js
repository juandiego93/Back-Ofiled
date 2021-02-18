const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
let Schema = mongoose.Schema

let rolesValidos = {
    values: ['ADMIN', 'USER', 'QA', 'DEV'],
    message: '{VALUE} no es un rol válido'
}

let usuarioSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    username: {
        type: String,
        required: [true, 'El nombre de usuario es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es requerido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
})

usuarioSchema.methods.toJSON = function () {
    let user = this
    let userObj = user.toObject()
    delete userObj.password
    return userObj
}


usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})


module.exports = mongoose.model('Usuario', usuarioSchema)