import { Pessoa } from "../model/Pessoa";
import { PessoaRepository } from "../repository/PessoaRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class PessoaService {
    private pessoaRepo = PessoaRepository.getInstance();
    private usuarioRepo = UsuarioRepository.getInstance();

    async cadastrarPessoa(pessoaData: any): Promise<Pessoa> {
        const { nome, email } = pessoaData;
        
        const pessoa = new Pessoa(0, nome, email);

        const novaPessoa =  await this.pessoaRepo.insert(pessoa);
        console.log("Pessoa - Service - Insert ", novaPessoa);
        return novaPessoa;
    }

    async atualizarPessoa(pessoaData: any): Promise<Pessoa> {
        const { id, nome, email } = pessoaData;

        const pessoa = new Pessoa(id, nome, email);

        await this.pessoaRepo.update(pessoa);
        console.log("Pessoa - Service - Update ", pessoa);
        return pessoa;
    }

    async deletarPessoa(pessoaData: any): Promise<Pessoa> {
        const { id, nome, email } = pessoaData;

        const usuario = await this.usuarioRepo.getByPessoa(id);
        if (usuario) throw new Error("Pessoa não pode ser deletada, pois está associada a um usuário");


        const pessoa = await this.pessoaRepo.getById(id);
        if (!pessoa) throw new Error("Pessoa não encontrada");
        if(pessoa.nome != nome) throw new Error("Nome inválido");
        if(pessoa.email != email) throw new Error("Email inválido");

        await this.pessoaRepo.delete(pessoa);
        console.log("Pessoa - Service - Delete ", pessoa);
        return pessoa;
    }

    async filtrarPessoa(pessoaData: any): Promise<Pessoa> {
        const idNumber = parseInt(pessoaData, 10);

        const pessoa =  await this.pessoaRepo.getById(idNumber);

        if (!pessoa) throw new Error("Pessoa não encontrada");

        console.log("Pessoa - Service - Filtrar", pessoa);
        return pessoa;
    }

    async listarTodasPessoas(): Promise<Pessoa[]> {
        const pessoas =  await this.pessoaRepo.getAll();
        console.log("Pessoa - Service - Filtrar Todos", pessoas);
        return pessoas;
    }

}