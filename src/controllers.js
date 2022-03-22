import { response } from "express"
import {Pessoa} from "./models.js"
import crypto from "crypto"

async function login(req, res) {
    let email = req.body.email;
    let senha = req.body.senha;
    console.log(email, senha);
    let pessoa = await Pessoa.findOne({
        where: {email: email}
    })

    if (!pessoa) {
        res.status(404);
        return res.json({ detail: "email não cadastrado" })
    }

    let senhaCriptografada = crypto.pbkdf2Sync(senha, pessoa.salt, 1000, 64, 'sha512');
    console.log('eae, rolou?')
    console.log(pessoa.senhaCriptografada == senhaCriptografada);
    res.end();
}

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

    let email = req.body.email
    if (!email) {
        res.status(400)
        return res.json({ detail: "'email' é obrigatório" })
    }
    let senha = req.body.senha
    if (!senha) {
        res.status(400)
        return res.json({ detail: "'senha' é obrigatório" })
    }
    let salt = crypto.randomBytes(16).toString('hex');
    let senhaCriptografada = crypto.pbkdf2Sync(
        senha, salt, 1000, 64, 'sha512'
    ).toString('hex');

    let pessoa = await Pessoa.findOne({where: {email: email}})
    if (pessoa) {
        res.status(400)
        return res.json({ detail: "Já existe pessoa com este nome" })
    }
    pessoa = await Pessoa.create({
        nome: nome,
        idade: idade,
        email: email,
        salt: salt,
        senhaCriptografada: senhaCriptografada,
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
    pessoa = await Pessoa.update({
        id: req.params.id,
        nome: nome,
        idade: idade,
    })
    res.json({pessoa})
}

export default { login, hello, getPessoas, createPessoa, deletePessoa, getPessoa, updatePessoa }
