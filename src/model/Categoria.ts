export class Categoria {
    id: number;
    nome: string;

    constructor(id?: number, nome?: string) {
        this.validateCategoriaData(id, nome);

        this.id = id || 0;
        this.nome = nome || '';
    }

    private validateCategoriaData(id?: number, nome?: string): void {
        let error = '';

        if (id !== undefined && (typeof id !== 'number' || id < 0)) {
            error += 'ID inválido. ';
        }

        if (!nome || typeof nome !== 'string' || nome.trim() === '') {
            error += 'Nome inválido. ';
        }

        if (error) {
            throw new Error(error.trim());
        }
    }
}
