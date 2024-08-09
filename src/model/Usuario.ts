import { Pessoa } from "./Pessoa";

export class Usuario extends Pessoa {
    senha: string;

    constructor(id: number, nome: string, email: string, senha: string) {
        super(id, nome, email);
        this.validateUsuarioData(senha);

        this.senha = senha;
    }

    private validateUsuarioData(senha: string): void {
        let error = '';

        if (!senha || typeof senha !== 'string' || senha.length < 6) {
            error += 'Senha inválida. Deve ter pelo menos 6 caracteres. ';
        }

        if (error) {
            throw new Error(error.trim());
        }
    }
}
