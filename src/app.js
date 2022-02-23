import express from "express"
import morgan from 'morgan'
import db from "./db.js";
import routes from "./routes.js";
import __dirname from "./get_path.js"

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'pug')
app.set('views', `${__dirname}/views`)
app.use(morgan('combined'))
app.use(express.json());
app.use('/static', express.static(`${__dirname}/public/static`));
app.use(routes);
db.sync(() => console.log(`Banco de dados conectado`));

app.listen(port, () => {
  console.log(`JSON example app listening at http://localhost:${port}`)
})
