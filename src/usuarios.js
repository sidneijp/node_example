import { response } from "express"
import {Usuario} from "./models.js"

async function getUsuarios(req, res) {
    let usuarios = await Usuario.findAll()
    res.json({usuarios})
}

async function createUsuario(req, res) {
    let email = req.body.email.trim().toLowerCase()
    if (!email) {
        res.status(400)
        return res.json({ detail: "'email' é obrigatório" })
    }
    let idade = Number.parseInt(req.body.idade)
    if (!Number.isInteger(idade)) {
        res.status(400)
        return res.json({ detail: "'idade' é obrigatório e deve ser um número inteiro" })
    }
    let usuario = await Usuario.findOne({where: {email: email}})
    if (usuario) {
        res.status(400)
        return res.json({ detail: "Já existe usuario com este email" })
    }
    usuario = await Usuario.create({
        email: email,
        idade: idade,
    })
    res.status(201)
    res.json({ usuario })
}

async function deleteUsuario(req, res) {
    await Usuario.destroy({
        where: {id: req.params.id}
    })
    res.status(204)
    res.json({ 'detail': 'deleted' })
}


async function getUsuario(req, res) {
    let usuario = await Usuario.findOne({
        where: {id: req.params.id}
    })
    if (!usuario) {
        return res.status(404).send({detail: "Not found"}).end()
    }
    res.json(usuario)
}

async function updateUsuario(req, res) {
    let usuario = await Usuario.findOne({
        where: {id: req.params.id}
    })
    if (!usuario) {
        return res.status(404).send({detail: "Not found"}).end()
    }
    let email = req.body.email.trim().toLowerCase()
    if (!email) {
        res.status(400)
        return res.json({ detail: "'email' é obrigatório" })
    }
    let idade = Number.parseInt(req.body.idade)
    if (!Number.isInteger(idade)) {
        res.status(400)
        return res.json({ detail: "'idade' é obrigatório e deve ser um número inteiro" })
    }
    usuario = await Usuario.update({
        id: req.params.id,
        email: email,
        idade: idade,
    })
    res.json({usuario})
}

export default { getUsuarios, createUsuario, deleteUsuario, getUsuario, updateUsuario }
