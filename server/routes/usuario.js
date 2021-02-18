const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const { verifyToken, } = require('../middlewares/auth')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/user', verifyToken, (request, response) => {

    let desde = request.query.desde || 0
    let limite = request.query.limite || 5
    Usuario
        .find({ status: true }, 'name email role status google img _id')
        .skip(Number(desde))
        .limit(Number(limite))
        .exec((err, users) => {
            if (err) {
                return response.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.count({ status: true }, (err, conteo) => {
                response.status(200).json({
                    ok: true,
                    sizeQuery: users.length,
                    cuantos: conteo,
                    users
                })
            })
        })
})

app.post('/user', function (request, response) {
    let body = request.body
    console.log(body);
    let usuario = new Usuario({
        fullname: body.fullname,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
    })
    usuario.save((err, usuarioDB) => {
        if (err) {
            return response.status(400).json({
                ok: false,
                err
            })
        }
        response.status(200).json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.put('/user/:id', [verifyToken], (request, response) => {
    let id = request.params.id
    let body = _.pick(request.body, ['fullname', 'username', 'email', 'status'])
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return response.status(400).json({
                ok: false,
                err
            })
        }
        response.status(200).json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.delete('/duser/:id', [verifyToken], (request, response) => {

    let id = request.params.id

    Usuario.findByIdAndRemove(id, (err, usuarioRemoved) => {
        if (err) {
            return response.status(400).json({
                ok: false,
                err
            })
        }

        if (!usuarioRemoved) {
            return response.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        response.status(200).json({
            ok: true,
            usuario: usuarioRemoved
        })

    })

})

app.delete('/user/:id', [verifyToken], (request, response) => {

    let id = request.params.id

    let cambioEstado = {
        status: false
    }

    Usuario.findByIdAndUpdate(id, cambioEstado, { new: true }, (err, usuarioRemoved) => {
        if (err) {
            return response.status(400).json({
                ok: false,
                err
            })
        }

        if (!usuarioRemoved) {
            return response.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        response.status(200).json({
            ok: true,
            usuario: usuarioRemoved
        })

    })

})

module.exports = app