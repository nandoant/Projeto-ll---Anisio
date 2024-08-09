import { Categoria } from "../model/Categoria";
import { CategoriaRepository } from "../repository/CategoriaRepository";

export class CategoriaService {
    private emprestimoRepo = CategoriaRepository.getInstance();

    async cadastrarCategoria(CategoriaData: any): Promise<Categoria> {
        const { nome } = CategoriaData;
        
        const categoria = new Categoria(0, nome);

        const novoCategoria =  await this.emprestimoRepo.insert(categoria);
        console.log("Categoria - Service - Insert ", novoCategoria);
        return novoCategoria;
    }

    async atualizarCategoria(CategoriaData: any): Promise<Categoria> {
        const { id, nome } = CategoriaData;

        const categoria = new Categoria(id, nome);

        await this.emprestimoRepo.update(categoria);
        console.log("Categoria - Service - Update ", categoria);
        return categoria;
    }

    async deletarCategoria(CategoriaData: any): Promise<Categoria> {
        const { id, nome } = CategoriaData;

        const categoria = new Categoria(id, nome);

        await this.emprestimoRepo.delete(categoria);
        console.log("Categoria - Service - Delete ", categoria);
        return categoria;
    }

    async filtrarCategoria(CategoriaData: any): Promise<Categoria> {
        const idNumber = parseInt(CategoriaData, 10);

        const categoria =  await this.emprestimoRepo.getById(idNumber);
        console.log("Categoria - Service - Filtrar", categoria);
        return categoria;
    }

    async listarTodasCategorias(): Promise<Categoria[]> {
        const emprestimos =  await this.emprestimoRepo.getAll();
        console.log("Categoria - Service - Filtrar Todos", emprestimos);
        return emprestimos;
    }

}