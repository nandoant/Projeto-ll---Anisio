import { Emprestimo } from "../model/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";

export class EmprestimoService {
    private emprestimoRepo = EmprestimoRepository.getInstance();

    async cadastrarEmprestimo(EmprestimoData: any): Promise<Emprestimo> {
        const { nome } = EmprestimoData;
        
        const emprestimo = new Emprestimo(0, nome);

        const novoEmprestimo =  await this.emprestimoRepo.insert(emprestimo);
        console.log("Emprestimo - Service - Insert ", novoEmprestimo);
        return novoEmprestimo;
    }

    async atualizarEmprestimo(EmprestimoData: any): Promise<Emprestimo> {
        const { id, nome } = EmprestimoData;

        const emprestimo = new Emprestimo(id, nome);

        await this.emprestimoRepo.update(emprestimo);
        console.log("Emprestimo - Service - Update ", emprestimo);
        return emprestimo;
    }

    async deletarEmprestimo(EmprestimoData: any): Promise<Emprestimo> {
        const { id, nome } = EmprestimoData;

        const emprestimo = new Emprestimo(id, nome);

        await this.emprestimoRepo.delete(emprestimo);
        console.log("Emprestimo - Service - Delete ", emprestimo);
        return emprestimo;
    }

    async filtrarEmprestimo(EmprestimoData: any): Promise<Emprestimo> {
        const idNumber = parseInt(EmprestimoData, 10);

        const emprestimo =  await this.emprestimoRepo.getById(idNumber);
        console.log("Emprestimo - Service - Filtrar", emprestimo);
        return emprestimo;
    }

    async listarTodasEmprestimos(): Promise<Emprestimo[]> {
        const emprestimos =  await this.emprestimoRepo.getAll();
        console.log("Emprestimo - Service - Filtrar Todos", emprestimos);
        return emprestimos;
    }

}