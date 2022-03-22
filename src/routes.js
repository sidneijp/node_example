import express from "express"
import controllers from "./controllers.js"
//import usuarios from "./usuarios.js"
import __dirname from "./get_path.js"

const routes = express.Router()

routes.get("/", (req, res) => res.sendFile(`${__dirname}/public/index.html`))

routes.get("/hello", controllers.hello)
routes.get("/pessoas", controllers.getPessoas)
routes.post("/pessoas", controllers.createPessoa)
routes.delete("/pessoas/:id", controllers.deletePessoa)
routes.get("/pessoas/:id", controllers.getPessoa)
routes.put("/pessoas/:id", controllers.updatePessoa)

/*
routes.get("/usuarios.html", (req, res) => res.sendFile(`${__dirname}/public/usuarios.html`))
routes.get("/usuarios", usuarios.getUsuarios)
routes.post("/usuarios", usuarios.createUsuario)
routes.delete("/usuarios/:id", usuarios.deleteUsuario)
routes.get("/usuarios/:id", usuarios.getUsuario)
routes.put("/usuarios/:id", usuarios.updateUsuario)
*/
export { routes as default }
