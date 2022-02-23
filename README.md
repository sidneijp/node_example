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

- Em qual porta a aplicação está executando?
- RESPOSTA: Na porta 3000.

- O que a aplicação faz?
- RESPOSTA: Cria listagem de Pessoas, onde cada pessoa tem Nome, Idade e se esta vacinado.

- Quais as **rotas** da aplicação?
- RESPOSTA: Temos a rota inicial /, a rota /hello que só é chamada diretamente no URL,  
- também temos a rota /pessoas com GET para renderizar a listagem de Pessoas,   
- a rota /pessoas que recebe o método POST para criar Pessoa,  
- a rota /pessoas/:id com método DELETE,  
- e a rota/pessoas/:id com método PUT que Substitui a lista e atualiza.

- Qual **framework web** está sendo utilizado no backend?
- RESPOSTA: EXPRESS.js é o que o nosso backend utiliza de framework web.  

- Qual **engine template** está sendo utilizada?
- RESPOSTA: PUG é o Engine Template utilizado.  

- Qual **DBMS** está sendo utilizado?
- RESPOSTA: SQlite.  
- Qual o formato do conteúdo do body das resposta relacionadas às rotas de Pessoa?
- RESPOSTA: JSON.

## Desafios:

1. Crie um **vhost** no apache2 e o configure como **reverse proxy** de forma que possa acessar sua aplicação node com o hostname "example.com" na porta 80 (sem mudar o hostname e porta no node) através do apache :thumbsup:

2. Sirva os **arquivos estáticos** (imagens, css e js) com o apache ao invés da aplicações node. :confused:

3. Crie uma conta no serviço de **PaaS** chamado **Heroku** e faça essa aplicação node executar em um **Dyno** gratuito :thumbsup:
<br>
- RESPOSTA: https://node-example-uli.herokuapp.com/  

4. Add um novo campo chamado `vacinado` do tipo **boolean** ao modelo `Pessoa` com **default** `FALSE`. :thumbsup::confused:

5. Atualize as **controllers** que lidam com a **entidade** `Pessoa` para ler/escrever no campo "vacinado" criado. :thumbsup:

6. Modifique o frontend para lidar com o campo `vacinado`. :thumbsup:

P.S.: add o arquivo ".conf" do apache que você escreveu ao seu repositório git. :thumbsup:
