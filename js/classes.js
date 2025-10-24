export class Client {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
    getInfo() {
        return `${this.nome} - ${this.email}`;
    }
}
