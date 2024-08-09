export class Livro {
    id: number;
    titulo: string;
    autor: string;
    categoriaId: number;

    constructor(id?: number, titulo?: string, autor?: string, categoriaId?: number) {
        this.validatesInformation(id, titulo, autor, categoriaId);

        this.id = id || 0;
        this.titulo = titulo || '';
        this.autor = autor || '';
        this.categoriaId = categoriaId || 0;
    }

    private validatesInformation(id?: number, titulo?: string, autor?: string, categoriaId?: number) {
        let error = '';

        if (typeof titulo !== 'string' || !titulo) {
            error += 'Título inválido. ';
        }

        if (typeof autor !== 'string' || !autor) {
            error += 'Autor inválido. ';
        }

        if (typeof categoriaId !== 'number' || categoriaId <= 0) {
            error += 'CategoriaId inválido. ';
        }

        if (error !== '') {
            throw new Error(error);
        }
    }
}
