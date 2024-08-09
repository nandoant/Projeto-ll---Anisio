export class Livro {
    id: number;
    titulo: string;
    autor: string;
    categoriaId: number;

    constructor(id?: number, titulo?: string, autor?: string, categoriaId?: number){
            this.autor = autor || '';
            this.titulo = titulo || '';
            this.id = id || 0;
            this.categoriaId = categoriaId || 0;

    }
}