import express from "express"
import controllers from "./controllers.js"
import __dirname from "./get_path.js"

const routes = express.Router()

routes.get("/", (req, res) => res.sendFile(`${__dirname}/public/index.html`))
routes.get("/hello", controllers.hello)
routes.get("/pessoas", controllers.getPessoas)
routes.post("/pessoas", controllers.createPessoa)
routes.delete("/pessoas/:id", controllers.deletePessoa)
routes.get("/pessoas/:id", controllers.getPessoa)
routes.put("/pessoas/:id", controllers.updatePessoa)

export { routes as default }
