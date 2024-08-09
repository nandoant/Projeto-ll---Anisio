export class Pessoa {
    id: number;
    nome: string;
    email: string;

    constructor(id: number, nome: string, email: string) {
        this.validatePessoaData(id, nome, email);

        this.id = id;
        this.nome = nome;
        this.email = email;
    }

    private validatePessoaData(id: number, nome: string, email: string): void {
        let error = '';

        if (typeof id !== 'number' || id < 0) {
            error += 'ID inválido. ';
        }

        if (!nome || typeof nome !== 'string' || nome.trim() === '') {
            error += 'Nome inválido. ';
        }

        if (!email || typeof email !== 'string' || !this.isValidEmail(email)) {
            error += 'Email inválido. ';
        }

        if (error) {
            throw new Error(error.trim());
        }
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
