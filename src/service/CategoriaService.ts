import { Categoria } from "../model/Categoria";
import { CategoriaRepository } from "../repository/CategoriaRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class CategoriaService {
    private categoriaRepo = CategoriaRepository.getInstance();
    private livroRepo = LivroRepository.getInstance();

    async cadastrarCategoria(CategoriaData: any): Promise<Categoria> {
        const { nome } = CategoriaData;
        
        const categoria = new Categoria(0, nome);

        const novoCategoria =  await this.categoriaRepo.insert(categoria);
        console.log("Categoria - Service - Insert ", novoCategoria);
        return novoCategoria;
    }

    async atualizarCategoria(CategoriaData: any): Promise<Categoria> {
        const { id, nome } = CategoriaData;

        const categoria = new Categoria(id, nome);

        await this.categoriaRepo.update(categoria);
        console.log("Categoria - Service - Update ", categoria);
        return categoria;
    }

    async deletarCategoria(CategoriaData: any): Promise<Categoria> {
        const { id, nome } = CategoriaData;

        const livro = await this.livroRepo.getByCategoriaId(id);
        if(livro)
            throw new Error("Não é possivel deletar essa categoria, pois ela esta sendo utilizada por pelo menos um livro. ");
        
        const categoria = new Categoria(id, nome);

        await this.categoriaRepo.delete(categoria);
        console.log("Categoria - Service - Delete ", categoria);
        return categoria;
    }

    async filtrarCategoria(CategoriaData: any): Promise<Categoria> {
        const idNumber = parseInt(CategoriaData, 10);

        const categoria =  await this.categoriaRepo.getById(idNumber);
        console.log("Categoria - Service - Filtrar", categoria);
        return categoria;
    }

    async listarTodasCategorias(): Promise<Categoria[]> {
        const emprestimos =  await this.categoriaRepo.getAll();
        console.log("Categoria - Service - Filtrar Todos", emprestimos);
        return emprestimos;
    }

}