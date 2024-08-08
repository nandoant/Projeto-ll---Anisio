import { Usuario } from "../model/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService {
    private UsuarioRepo = UsuarioRepository.getInstance();

    async cadastrarUsuario(usuarioData: any): Promise<Usuario> {
        const { nome, email, senha } = usuarioData;
        
        const usuario = new Usuario(0, nome, email, senha);

        const novoUsuario =  await this.UsuarioRepo.insert(usuario);
        console.log("Usuario - Service - Insert ", novoUsuario);
        return novoUsuario;
    }

    async atualizarUsuario(usuarioData: any): Promise<Usuario> {
        const { id, nome, email, senha } = usuarioData;

        const usuario = new Usuario(id, nome, email, senha);

        await this.UsuarioRepo.update(usuario);
        console.log("Usuario - Service - Update ", usuario);
        return usuario;
    }

    async deletarUsuario(usuarioData: any): Promise<Usuario> {
        const { id, nome, email, senha } = usuarioData;

        const usuario = new Usuario(id, nome, email, senha);

        await this.UsuarioRepo.delete(usuario);
        console.log("Usuario - Service - Delete ", usuario);
        return usuario;
    }

    async filtrarUsuario(usuarioData: any): Promise<Usuario> {
        const idNumber = parseInt(usuarioData, 10);

        const usuario =  await this.UsuarioRepo.getById(idNumber);
        console.log("Usuario - Service - Filtrar", usuario);
        return usuario;
    }

    async listarTodasUsuarios(): Promise<Usuario[]> {
        const usuarios =  await this.UsuarioRepo.getAll();
        console.log("Usuario - Service - Filtrar Todos", usuarios);
        return usuarios;
    }

}