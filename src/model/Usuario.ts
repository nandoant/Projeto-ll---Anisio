import { Pessoa } from "./Pessoa";

export class Usuario {
    id: number;
    idPessoa: number;
    senha: string;

    constructor(id: number, idPessoa: number, senha: string) {
        this.id = id;
        this.idPessoa = idPessoa;
        this.senha = senha;
        this.validateUsuarioData(id, idPessoa, senha);
    }

    private validateUsuarioData(id:number, idPessoa: number, senha: string): void {
        let error = '';

        if (!senha || typeof senha !== 'string' || senha.length < 6) {
            error += 'Senha inválida. Deve ter pelo menos 6 caracteres. ';
        }

        if (!idPessoa || typeof idPessoa !== 'number' || idPessoa < 0) {
            error += 'IdPessoa inválido. ';
        }

        if (!id || typeof id !== 'number' || id < 0) {
            error += 'Id inválido. ';
        }

        if (error) {
            throw new Error(error.trim());
        }
    }
}
