import express from "express"
import morgan from 'morgan'
import session from 'express-session'
import bodyParser from "body-parser";

import db from "./db.js";
import routes from "./routes.js";
import auth_routes from "./auth/routes.js";
import __dirname from "./get_path.js"

const app = express()
const port = process.env.PORT || 3000
const { NODE_ENV } = process.env

app.set('view engine', 'pug')
app.set('views', `${__dirname}/views`)
app.set('views', `${__dirname}/auth/views`)
app.use(bodyParser.urlencoded({extended: true}))
app.use(
  session({
    name: 'session_id',
    saveUninitialized: false,
    resave: false,
    secret: 'asdasdasdsadasda',
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
      secure: NODE_ENV === 'production'
    }
  })
)
app.use(morgan('combined'))
app.use(express.json());
app.use('/static', express.static(`${__dirname}/public/static`));

app.use(routes);
app.use(auth_routes);


db.sync(() => console.log(`Banco de dados conectado`));

app.listen(port, () => {
  console.log(`JSON example app listening at http://localhost:${port}`)
})
