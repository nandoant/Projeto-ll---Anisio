import { Livro } from "../model/Livro";
import { CategoriaRepository } from "../repository/CategoriaRepository";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService {
    private livroRepo = LivroRepository.getInstance();
    private categoRepo = CategoriaRepository.getInstance();
    private emprestRepo = EmprestimoRepository.getInstance();

    async cadastrarLivro(livroData: any): Promise<Livro> {
        const { titulo, autor, categoriaId } = livroData;
        await this.existeCategoria(categoriaId);
        
        const livro = new Livro(0, titulo, autor, categoriaId);
        const novoLivro =  await this.livroRepo.insert(livro);

        console.log("Livro - Service - Insert ", novoLivro);
        return novoLivro;
    }

    async atualizarLivro(livroData: any): Promise<Livro> {
        const { id, titulo, autor, categoriaId } = livroData;
        await this.existeCategoria(categoriaId);

        const livro = new Livro(id, titulo, autor, categoriaId);
        await this.livroRepo.update(livro);

        console.log("Livro - Service - Update ", livro);
        return livro;
    }

    
    async deletarLivro(livroData: any): Promise<Livro> {
        const { id, titulo, autor, categoriaId} = livroData;

        const livro = await this.livroRepo.getById(id);
        if(!livro)
            throw new Error("Livro não encontrado");


        if(livro.autor !== autor )
            throw new Error("livro_autor: " + livro.autor + " |autor: " + autor);
        if (livro.categoriaId != parseInt(categoriaId))
            throw new Error("Informações não condizem com as salvas - categoriaId");
        if(livro.titulo !== titulo)
            throw new Error("Informações não condizem com as salvas - titulo");


        const emprestimo = await this.emprestRepo.getByLivroId(livro.id);
        if(emprestimo)
            throw new Error("Não é possivel deletar esse livro, pois ele esta sendo utilizado por pelo menos um emprestimo. ");

        await this.livroRepo.delete(livro);

        console.log("Livro - Service - Delete ", livro);
        return livro;
    }

    async filtrarLivro(livroData: any): Promise<Livro> {
        const idNumber = parseInt(livroData, 10);

        const livro =  await this.livroRepo.getById(idNumber);
        if(!livro)
            throw new Error("Não existe um livro com esse id")

        console.log("Livro - Service - Filtrar", livro);
        return livro;
    }

    async listarTodasLivros(): Promise<Livro[]> {
        const livros =  await this.livroRepo.getAll();

        console.log("Livro - Service - Filtrar Todos", livros);
        return livros;
    }
    

    private async existeCategoria(categoriaId:number) {
        const existeCategoria = await this.categoRepo.getById(categoriaId);
        console.log(existeCategoria);

        

        if (this.isEmptyArray(existeCategoria)) {
            throw new Error("Não existe categoria com esse id");
        }
    }

    private isEmptyArray(variable: any): boolean {
        return Array.isArray(variable) && variable.length === 0;
    }

}