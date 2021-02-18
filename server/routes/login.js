const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')
const app = express()

app.post('/login', (request, response) => {
    try {
        let body = request.body
        console.log(body);
        const promiseSearchUser = Usuario.findOne({ email: body.email }).exec()
        promiseSearchUser
            .then(usuarioDB => {
                if (!usuarioDB) {
                    return response.status(400).json({
                        ok: false,
                        err: {
                            message: 'Usuario o contraseña incorrectos'
                        }
                    })
                }

                const matchPass = bcrypt.compareSync(`${body.password}`, `${usuarioDB.password}`)
                if (!matchPass) {
                    return response.status(400).json({
                        ok: false,
                        err: {
                            message: 'Usuario o contraseña incorrectos'
                        }
                    })
                }

                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })

                response.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            })
            .catch(err => {
                return response.status(500).json({
                    ok: false,
                    err,
                    token
                })
            })
    } catch (error) {
        return error
    }

})

module.exports = app