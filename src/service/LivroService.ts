import { Livro } from "../model/Livro";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService {
    private LivroRepo = LivroRepository.getInstance();

    async cadastrarLivro(livroData: any): Promise<Livro> {
        const { titulo, autor, categoriaId } = livroData;
        
        const livro = new Livro(0, titulo, autor, categoriaId);

        const novoLivro =  await this.LivroRepo.insert(livro);
        console.log("Livro - Service - Insert ", novoLivro);
        return novoLivro;
    }

    async atualizarLivro(livroData: any): Promise<Livro> {
        const { id, titulo, autor, categoriaId } = livroData;

        const livro = new Livro(id, titulo, autor, categoriaId);

        await this.LivroRepo.update(livro);
        console.log("Livro - Service - Update ", livro);
        return livro;
    }

    async deletarLivro(livroData: any): Promise<Livro> {
        const { id, titulo, autor, categoriaId} = livroData;

        const livro = new Livro(id, titulo, autor, categoriaId);

        await this.LivroRepo.delete(livro);
        console.log("Livro - Service - Delete ", livro);
        return livro;
    }

    async filtrarLivro(livroData: any): Promise<Livro> {
        const idNumber = parseInt(livroData, 10);

        const livro =  await this.LivroRepo.getById(idNumber);
        console.log("Livro - Service - Filtrar", livro);
        return livro;
    }

    async listarTodasLivros(): Promise<Livro[]> {
        const livros =  await this.LivroRepo.getAll();
        console.log("Livro - Service - Filtrar Todos", livros);
        return livros;
    }

}