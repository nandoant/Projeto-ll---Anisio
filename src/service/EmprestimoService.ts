import { Emprestimo } from "../model/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";

export class EmprestimoService {
    private EmprestimoRepo = EmprestimoRepository.getInstance();

    async cadastrarEmprestimo(emprestimoData: any): Promise<Emprestimo> {
        const { livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;
        
        const emprestimo = new Emprestimo(0, livroId, usuarioId, dataEmprestimo, dataDevolucao);

        const novoEmprestimo =  await this.EmprestimoRepo.insert(emprestimo);
        console.log("Emprestimo - Service - Insert ", novoEmprestimo);
        return novoEmprestimo;
    }

    async atualizarEmprestimo(emprestimoData: any): Promise<Emprestimo> {
        const { id, livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;

        const emprestimo = new Emprestimo(id, livroId, usuarioId, dataEmprestimo, dataDevolucao);

        await this.EmprestimoRepo.update(emprestimo);
        console.log("Emprestimo - Service - Update ", emprestimo);
        return emprestimo;
    }

    async deletarEmprestimo(emprestimoData: any): Promise<Emprestimo> {
        const { id, livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;

        const emprestimo = new Emprestimo(id, livroId, usuarioId, dataEmprestimo, dataDevolucao);

        await this.EmprestimoRepo.delete(emprestimo);
        console.log("Emprestimo - Service - Delete ", emprestimo);
        return emprestimo;
    }

    async filtrarEmprestimo(id: any): Promise<Emprestimo> {
        const idNumber = parseInt(id, 10);

        const emprestimo =  await this.EmprestimoRepo.getById(idNumber);
        console.log("Emprestimo - Service - Filtrar", emprestimo);
        return emprestimo;
    }

    async listarTodasEmprestimos(): Promise<Emprestimo[]> {
        const emprestimos =  await this.EmprestimoRepo.getAll();
        console.log("Emprestimo - Service - Filtrar Todos", emprestimos);
        return emprestimos;
    }

}