import { Pessoa } from "../model/Pessoa";
import { PessoaRepository } from "../repository/PessoaRepository";

export class PessoaService {
    private PessoaRepo = PessoaRepository.getInstance();

    async cadastrarPessoa(pessoaData: any): Promise<Pessoa> {
        const { nome, email } = pessoaData;
        
        const pessoa = new Pessoa(0, nome, email);

        const novaPessoa =  await this.PessoaRepo.insert(pessoa);
        console.log("Pessoa - Service - Insert ", novaPessoa);
        return novaPessoa;
    }

    async atualizarPessoa(pessoaData: any): Promise<Pessoa> {
        const { id, nome, email } = pessoaData;

        const pessoa = new Pessoa(id, nome, email);

        await this.PessoaRepo.update(pessoa);
        console.log("Pessoa - Service - Update ", pessoa);
        return pessoa;
    }

    async deletarPessoa(pessoaData: any): Promise<Pessoa> {
        const { id, nome, email } = pessoaData;

        const pessoa = new Pessoa(id, nome, email);

        await this.PessoaRepo.delete(pessoa);
        console.log("Pessoa - Service - Delete ", pessoa);
        return pessoa;
    }

    async filtrarPessoa(pessoaData: any): Promise<Pessoa> {
        const idNumber = parseInt(pessoaData, 10);

        const pessoa =  await this.PessoaRepo.getById(idNumber);
        console.log("Pessoa - Service - Filtrar", pessoa);
        return pessoa;
    }

    async listarTodasPessoas(): Promise<Pessoa[]> {
        const pessoas =  await this.PessoaRepo.getAll();
        console.log("Pessoa - Service - Filtrar Todos", pessoas);
        return pessoas;
    }

}