import { Livro } from "../model/Livro";
import { CategoriaRepository } from "../repository/CategoriaRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService {
    private livroRepo = LivroRepository.getInstance();
    private categoRepo = CategoriaRepository.getInstance();

    async cadastrarLivro(livroData: any): Promise<Livro> {
        const { titulo, autor, categoriaId } = livroData;
        await this.validateCategoria(categoriaId);
        
        
        const livro = new Livro(0, titulo, autor, categoriaId);
        const novoLivro =  await this.livroRepo.insert(livro);

        console.log("Livro - Service - Insert ", novoLivro);
        return novoLivro;
    }

    async atualizarLivro(livroData: any): Promise<Livro> {
        const { id, titulo, autor, categoriaId } = livroData;
        //TODO - tenho que adicionar erro 404 quando não existe um livro com o id ?.
        await this.validateCategoria(categoriaId);

        const livro = new Livro(id, titulo, autor, categoriaId);
        await this.livroRepo.update(livro);

        console.log("Livro - Service - Update ", livro);
        return livro;
    }

    async deletarLivro(livroData: any): Promise<Livro> {
        const { id, titulo, autor, categoriaId} = livroData;
        //TODO - tenho que adicionar uma procura ao inves do metodo abaixo.
        await this.validateCategoria(categoriaId);

        const livro = new Livro(id, titulo, autor, categoriaId);
        await this.livroRepo.delete(livro);

        console.log("Livro - Service - Delete ", livro);
        return livro;
    }

    async filtrarLivro(livroData: any): Promise<Livro> {
        const idNumber = parseInt(livroData, 10);

        const livro =  await this.livroRepo.getById(idNumber);

        console.log("Livro - Service - Filtrar", livro);
        return livro;
    }

    async listarTodasLivros(): Promise<Livro[]> {
        const livros =  await this.livroRepo.getAll();

        console.log("Livro - Service - Filtrar Todos", livros);
        return livros;
    }
    

    private async validateCategoria(categoriaId:number) {
        const existeCategoria = await this.categoRepo.getById(categoriaId);
        console.log(existeCategoria);

        if (this.isEmptyArray(existeCategoria)) {
            throw new Error("Não existe categoria com esse id");
        }

        const existeCategAssociada = await this.livroRepo.getByCategoriaId(categoriaId);

        if (existeCategAssociada) {
            throw new Error("Essa categoria já está associada a outro livro");
        }
    }

    private isEmptyArray(variable: any): boolean {
        return Array.isArray(variable) && variable.length === 0;
    }

}