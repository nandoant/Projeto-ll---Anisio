import { Emprestimo } from "../model/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { LivroRepository } from "../repository/LivroRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class EmprestimoService {
    private EmprestimoRepo = EmprestimoRepository.getInstance();
    private LivroRepo = LivroRepository.getInstance();
    private UsuarioRepo = UsuarioRepository.getInstance();

    async cadastrarEmprestimo(emprestimoData: any): Promise<Emprestimo> {
        const { livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;
        await this.validateLivroId(livroId);
        await this.validateUsuarioId(usuarioId);
        
        const emprestimo = new Emprestimo(0, livroId, usuarioId, dataEmprestimo, dataDevolucao);

        const novoEmprestimo =  await this.EmprestimoRepo.insert(emprestimo);
        console.log("Emprestimo - Service - Insert ", novoEmprestimo);
        return novoEmprestimo;
    }

    async atualizarEmprestimo(emprestimoData: any): Promise<Emprestimo> {
        const { id, livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;
        
        const existeEmprestimo = await this.EmprestimoRepo.getById(id);
        console.log("emprestimo: ", existeEmprestimo);
        if(this.isEmptyArray(existeEmprestimo)){
            throw new Error("Não existe emprestimo com esse id");
        }

        if(existeEmprestimo.livroId !== livroId){
            const existeLivro = await this.LivroRepo.getById(livroId);
            if(!existeLivro){
                throw new Error("Não existe livro com esse id");
            }

            const existeLivroAssociado = await this.EmprestimoRepo.getByLivroId(livroId);
            if (existeLivroAssociado) {
                throw new Error("Esse livro já está associado a outro emprestimo");
            }
        }

        if(existeEmprestimo.usuarioId !== usuarioId){
            const existeUsuario = await this.UsuarioRepo.getById(usuarioId);
            if(!existeUsuario){
                throw new Error("Não existe usuario com esse id");
            }

            const existeUserAssociado = await this.EmprestimoRepo.getByUsuarioId(usuarioId);
            if (existeUserAssociado) {
                throw new Error("Esse Usuario já está associado a outro livro");
            }
        }

        const emprestimo = new Emprestimo(id, livroId, usuarioId, dataEmprestimo, dataDevolucao);

        await this.EmprestimoRepo.update(emprestimo);
        console.log("Emprestimo - Service - Update ", emprestimo);
        return emprestimo;
    }

    async deletarEmprestimo(emprestimoData: any): Promise<Emprestimo> {
        const { id, livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;

        const emprestimo = await this.EmprestimoRepo.getById(id);
        if(this.isEmptyArray(emprestimo)){
            throw new Error("Não existe emprestimo com esse id");
        }
        if(emprestimo.livroId !== livroId){
            throw new Error("Informações não condizem com as salvas - livroId");
        }
        if(emprestimo.usuarioId !== usuarioId){
            throw new Error("Informações não condizem com as salvas - usuarioId");
        }
        if(emprestimo.dataEmprestimo !== dataEmprestimo){
            throw new Error("Informações não condizem com as salvas - dataEmprestimo");
        }
        if(emprestimo.dataDevolucao !== dataDevolucao){
            throw new Error("Informações não condizem com as salvas - dataDevolucao");
        }

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

    //validations
    private async validateUsuarioId(usuarioId: number){
        const existeUsuario = await this.UsuarioRepo.getById(usuarioId);

        if(this.isEmptyArray(existeUsuario)){
            throw new Error("Não existe usuario com esse id");
        }

        const existeUserAssociado = await this.EmprestimoRepo.getByUsuarioId(usuarioId);    

        if (existeUserAssociado) {
            throw new Error("Esse Usuario já está associado a outro livro");
        }

    }

    private async validateLivroId(livroId: number){
        const existeLivro = await this.LivroRepo.getById(livroId);

        if(this.isEmptyArray(existeLivro)){
            throw new Error("Não existe livro com esse id");
        }

        const existeLivroAssociado = await this.EmprestimoRepo.getByLivroId(livroId);

        if (existeLivroAssociado) {
            throw new Error("Esse livro já está associado a outro emprestimo");
        }

    }

    private isEmptyArray(variable: any): boolean {
        return Array.isArray(variable) && variable.length === 0;
    }

}