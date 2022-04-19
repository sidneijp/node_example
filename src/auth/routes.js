import express from "express"
import controllers from "./controllers.js"
import __dirname from "../get_path.js"

const routes = express.Router()

routes.get("/register", controllers.already_authenticated_handler, controllers.show_register)
routes.post("/register", controllers.already_authenticated_handler, controllers.process_register)

routes.get("/login", controllers.already_authenticated_handler, controllers.show_login)
routes.post("/login", controllers.already_authenticated_handler, controllers.process_login)

routes.get("/change-password", controllers.not_authenticated_handler, controllers.change_password)
routes.post("/change-password", controllers.not_authenticated_handler, controllers.process_change_password)

routes.get("/profile", controllers.not_authenticated_handler, controllers.show_profile)

routes.post("/logout", controllers.not_authenticated_handler, controllers.logout)

export { routes as default }
