import { response } from "express"
import {Pessoa} from "./models.js"

async function hello(req, res) {
    res.render('hello', { title: 'Hello World', message: 'Olá mundo' })
}

async function getPessoas(req, res) {
    let pessoas = await Pessoa.findAll()
    res.json({pessoas})
}

async function createPessoa(req, res) {
    let nome = req.body.nome.trim().toLowerCase()
    if (!nome) {
        res.status(400)
        return res.json({ detail: "'nome' é obrigatório" })
    }
    let idade = Number.parseInt(req.body.idade)
    if (!Number.isInteger(idade)) {
        res.status(400)
        return res.json({ detail: "'idade' é obrigatório e deve ser um número inteiro" })
    } 
    let vacinado = req.body.vacinado;
    let pessoa = await Pessoa.findOne({where: {nome: nome}})
    if (pessoa) {
        res.status(400)
        return res.json({ detail: "Já existe pessoa com este nome" })
    }
    pessoa = await Pessoa.create({
        nome: nome,
        idade: idade,
	    vacinado: vacinado,
    })
    res.status(201)
    res.json({ pessoa })
}

async function deletePessoa(req, res) {
    await Pessoa.destroy({
        where: {id: req.params.id}
    })
    res.status(204)
    res.json({ 'detail': 'deleted' })
}


async function getPessoa(req, res) {
    let pessoa = await Pessoa.findOne({
        where: {id: req.params.id}
    })
    if (!pessoa) {
        return res.status(404).send({detail: "Not found"}).end()
    }
    res.json(pessoa)
}

async function updatePessoa(req, res) {
    let pessoa = await Pessoa.findOne({
        where: {id: req.params.id}
    })
    if (!pessoa) {
        return res.status(404).send({detail: "Not found"}).end()
    }
    let nome = req.body.nome.trim().toLowerCase()
    if (!nome) {
        res.status(400)
        return res.json({ detail: "'nome' é obrigatório" })
    }
    let idade = Number.parseInt(req.body.idade)
    if (!Number.isInteger(idade)) {
        res.status(400)
        return res.json({ detail: "'idade' é obrigatório e deve ser um número inteiro" })
    }
    let vacinado = req.body.vacinado;
    pessoa = await Pessoa.update({
        id: req.params.id,
        nome: nome,
        idade: idade,
        vacinado: vacinado,
    })
    res.json({pessoa})
}

export default { hello, getPessoas, createPessoa, deletePessoa, getPessoa, updatePessoa }
