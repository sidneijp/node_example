## Dependências

Windows:
- [WSL 2](https://docs.microsoft.com/pt-br/windows/wsl/install) com distribuição Linux Ubuntu 20.04
- [NVM](https://github.com/nvm-sh/nvm) (dentro do WSL 2)
- Node v17.3.0 (dentro do WSL 2)
- Apache2 (dentro do WSL 2)

MacOS:
- [brew](https://brew.sh/index_pt-br)
- [NVM](https://github.com/nvm-sh/nvm)
- Node v17.3.0
- Apache2

Linux:
- [NVM](https://github.com/nvm-sh/nvm)
- Node v17.3.0
- Apache2

## Instalação

Execute o seguinte comando para instalar localmente as dependências:

```
npm install
```
## Execução

Para iniciar a aplicação, execute o comando:
```
npm start
```

ou, para executar com autoload, execute:

```
npm run start-dev
```

# Atividade

Faça um **fork** deste repositório no GitHub para responder as perguntas e realizar os desafios e ao final realizer um **Pull Request** no meu repositório (use o branch master).

## Perguntas:

- Em qual porta a aplicação está executando? - 3000
- O que a aplicação faz? - cadostro de nome e idade /  delata cadastro
- Quais as **rotas** da aplicação? - routes.get("/", (req, res) => res.sendFile(`${__dirname}/public/index.html`))
                                                routes.get("/hello", controllers.hello)
                                                routes.get("/pessoas", controllers.getPessoas)
                                                routes.post("/pessoas", controllers.createPessoa)
                                                routes.delete("/pessoas/:id", controllers.deletePessoa)
                                                routes.get("/pessoas/:id", controllers.getPessoa)
                                                routes.put("/pessoas/:id", controllers.updatePessoa)
- Qual **framework web** está sendo utilizado no backend?  next
- Qual **engine template** está sendo utilizada? pub
- Qual **DBMS** está sendo utilizado? sqlite
- Qual o formato do conteúdo do body das resposta relacionadas às rotas de Pessoa? json

## Desafios:

1. Crie um **vhost** no apache2 e o configure como **reverse proxy** de forma que possa acessar sua aplicação node com o hostname "example.com" na porta 80 (sem mudar o hostname e porta no node) através do apache
2. Sirva os **arquivos estáticos** (imagens, css e js) com o apache ao invés da aplicações node
3. Crie uma conta no serviço de **PaaS** chamado **Heroku** e faça essa aplicação node executar em um **Dyno** gratuito
4. Add um novo campo chamado `vacinado` do tipo **boolean** ao modelo `Pessoa` com **default** `FALSE`
5. Atualize as **controllers** que lidam com a **entidade** `Pessoa` para ler/escrever no campo "vacinado" criado
6. Modifique o frontend para lidar com o campo `vacinado`

P.S.: add o arquivo ".conf" do apache que você escreveu ao seu repositório git.
