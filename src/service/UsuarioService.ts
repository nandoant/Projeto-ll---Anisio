import { Usuario } from "../model/Usuario";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { PessoaRepository } from "../repository/PessoaRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService {
    private usuarioRepo = UsuarioRepository.getInstance();
    private pessoaRepo = PessoaRepository.getInstance();
    private emprestimoRepo = EmprestimoRepository.getInstance();

    async cadastrarUsuario(usuarioData: any): Promise<Usuario> {
        const { idPessoa, senha } = usuarioData;
        await this.verificarPessoaExiste(idPessoa);
        
        const usuario = new Usuario(1, idPessoa, senha);
        const novoUsuario = await this.usuarioRepo.insert(usuario);
        
        console.log("Usuario cadastrado:", novoUsuario);
        return novoUsuario;
    }
    
    async atualizarUsuario(usuarioData: any): Promise<Usuario> {
        const { id, idPessoa, senha } = usuarioData;
        if (!id) throw new Error("ID do usuário é obrigatório para atualização");
    
        const usuarioExistente = await this.usuarioRepo.getById(id);
        if (!usuarioExistente) throw new Error("Usuário não encontrado");
        
        if (usuarioExistente.idPessoa !== idPessoa) {
          await this.verificarPessoaExiste(idPessoa);
        }
    
        const usuarioAtualizado = new Usuario(id, idPessoa, senha);
        await this.usuarioRepo.update(usuarioAtualizado);
        
        console.log("Usuário atualizado:", usuarioAtualizado);
        return usuarioAtualizado;
    }
    
    async deletarUsuario(usuarioData: any): Promise<Usuario> {
        const { id, idPessoa, senha } = usuarioData;
        if (!id) throw new Error("ID do usuário é obrigatório para deleção");
    
        await this.verificarUsuarioPodeDeletar(id);
        const usuario = await this.validarUsuario(id, idPessoa, senha);
    
        await this.usuarioRepo.delete(usuario);
        console.log("Usuário deletado:", usuario);
        return usuario;
    }
    
    async buscarUsuarioPorId(id: any): Promise<Usuario> {
        const usuario = await this.usuarioRepo.getById(id);
        if (!usuario) throw new Error("Usuário não encontrado");
    
        console.log("Usuário encontrado:", usuario);
        return usuario;
    }
    
    async listarTodosUsuarios(): Promise<Usuario[]> {
        const usuarios = await this.usuarioRepo.getAll();
        console.log("Total de usuários:", usuarios.length);
        return usuarios;
    }
    
    private async verificarPessoaExiste(pessoaId: number): Promise<void> {
        const pessoa = await this.pessoaRepo.getById(pessoaId);
        if (!pessoa) throw new Error("Pessoa não encontrada");
    
        /* Permite apenas um usuário por pessoa
        const usuarioExistente = await this.usuarioRepo.getByPessoa(pessoaId);
        if (usuarioExistente) throw new Error("Pessoa já possui um usuário cadastrado");
        */
    }
    
    private async verificarUsuarioPodeDeletar(usuarioId: number): Promise<void> {
        const emprestimo = await this.emprestimoRepo.getByUsuarioId(usuarioId);
        if (emprestimo) throw new Error("Usuário não pode ser deletado, pois está associado a um empréstimo");
    }
    
    private async validarUsuario(id: number, idPessoa: number, senha: string): Promise<Usuario> {
        const usuario = await this.usuarioRepo.getById(id);
        if (!usuario) throw new Error("Usuário não encontrado");
        if (usuario.idPessoa !== idPessoa || usuario.senha !== senha) throw new Error("Dados inválidos");
        return usuario;
    }
}