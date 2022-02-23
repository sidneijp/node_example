"use strict";
class Pessoa {
    constructor(nome, idade, _conjuge) {
        this.nome = nome;
        this.idade = idade;
        this._conjuge = _conjuge;
        this.nome = nome;
        this.idade = idade;
        this._conjuge = _conjuge;
        this.setConjuge(this._conjuge);
    }
    apresentar() {
        let mensagem = `Meu nome é ${this.nome} e tenho ${this.idade} ano(s).`;
        let conjuge = this.getConjuge();
        if (conjuge) {
            mensagem = mensagem.concat(` Meu conjuge se chama ${this.getNomeConjuge()}.`);
        }
        return mensagem;
    }
    getNomeConjuge() {
        let conjuge = this.getConjuge();
        if (conjuge) {
            return conjuge.nome;
        }
    }
    getConjuge() {
        return this._conjuge;
    }
    setConjuge(pessoa) {
        if (pessoa) {
            this._conjuge = pessoa;
            pessoa._conjuge = this;
        }
    }
}
let jose = new Pessoa("José", 60);
console.log(jose.apresentar());
console.log(jose.getNomeConjuge());
//console.log(jose.getConjuge().idade)
let josefa = new Pessoa("Josefa", 57, jose);
console.log(jose.apresentar());
console.log(josefa.apresentar());
