import {User} from "./models.js"
import crypto from "crypto"
import { nextTick } from "process"

async function already_authenticated_handler(req, res, next) {
    if (req.session.userId) {
        console.log('já está autenticado')
        res.redirect('/profile')
    } else {
        next()
    }
}

async function not_authenticated_handler(req, res, next) {
    if (!req.session.userId) {
        console.log('usuário não autenticado')
        res.redirect('/login')
    } else {
        next()
    }
}

async function show_register(req, res) {
    res.render('register');
}

async function process_register(req, res) {
    let { email, senha } = req.body
    if (!email) {
        console.log('email obrigatório')
        return res.redirect('/register')
    }
    if (!senha) {
        console.log('senha obrigatória')
        return res.redirect('/register')
    }
    let user = await User.findOne({where: {email: email}})
    if (user) {
        console.log('email já cadastrado')
        return res.redirect('/register')
    }
    let salt = crypto.randomBytes(16).toString('hex');
    let senhaCriptografada = crypto.pbkdf2Sync(
        senha, salt, 1000, 64, 'sha512'
    ).toString('hex');
    user = await User.create({
        email: email,
        salt: salt,
        senhaCriptografada: senhaCriptografada,
    })
    req.session.userId = user.id
    return res.redirect('/profile')
}

async function show_login(req, res) {
    res.render('login');
}

async function process_login(req, res) {
    let { email, senha } = req.body
    let user = await User.findOne({
        where: {email: email}
    })
    console.log('usario', user)
    if (!user) {
        console.log('usuário não encontrado')
        return res.redirect('/login')
    }
    let senhaCriptografada = crypto.pbkdf2Sync(senha, user.salt, 1000, 64, 'sha512').toString('hex');
    console.log(senhaCriptografada)
    console.log(user.senhaCriptografada)
    if (user.senhaCriptografada === senhaCriptografada) {
        req.session.userId = user.id
        return res.redirect('/profile')
    }
    console.log('senha incorreta')
    return res.redirect('/login')
}

async function change_password(req, res) {
    res.render('change_password')
}

async function process_change_password(req, res) {
    let { senha_antiga, senha_nova} = req.body
    const { userId } = req.session
    let user = await User.findOne({where: {id: userId}})
    if (user) {
        let senha_antiga_criptografada = crypto.pbkdf2Sync(senha_antiga, user.salt, 1000, 64, 'sha512').toString('hex')
        if (senha_antiga_criptografada === user.senhaCriptografada) {
            user.senhaCriptografada = crypto.pbkdf2Sync(senha_nova, user.salt, 1000, 64, 'sha512').toString('hex')
            user.save()
            return req.session.destroy(err => {
                res.clearCookie('session_id')
                res.redirect('/login')
            })
        }
    }
    res.redirect('/change-password')
}

async function show_profile(req, res) {
    const { userId } = req.session
    console.log('userId', userId)
    const user = await User.findOne({where: {id: userId}})
    if (!user) {
        res.redirect('/login')
    }
    console.log('user', user)
    res.render('profile', {user: user})
}

async function logout(req, res) {
    req.session.destroy(err => {
        res.clearCookie('session_id')
        res.redirect('/login')
    })
}

export default {
    show_register, process_register, show_login, process_login, show_profile, logout,
    change_password, process_change_password,
    already_authenticated_handler, not_authenticated_handler
}
