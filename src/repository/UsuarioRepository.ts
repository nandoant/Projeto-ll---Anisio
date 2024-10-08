import { executarComandoSQL } from "../database/mysql";
import { Usuario } from "../model/Usuario";

export class UsuarioRepository {
    
    private static instance: UsuarioRepository;

    public static getInstance(): UsuarioRepository {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance
    }
    
    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Usuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            idPessoa INT NOT NULL,
            senha VARCHAR(255) NOT NULL
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insert(usuario:Usuario): Promise<Usuario> {
        const query = "INSERT INTO biblioteca.Usuario (idPessoa, senha) VALUES (?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [usuario.idPessoa, usuario.senha]);
            console.log('Usuario inserido(a) com sucesso, ID: ', resultado.insertId);
            usuario.id = resultado.insertId;
            return new Promise<Usuario>((resolve)=> {
                resolve(usuario);
            })
        } catch (err) {
            console.error('Erro ao inserir o usuario:', err);
            throw err;
        }
    }

    async update(usuario:Usuario): Promise<Usuario> {
        const query = "UPDATE biblioteca.usuario SET idPessoa = ?, senha = ? WHERE (id = ?);"

        try {
            const resultado = await executarComandoSQL(query, [usuario.idPessoa, usuario.senha, usuario.id]);
            console.log('Usuario atualizado com sucesso, ID: ', resultado);
            return new Promise<Usuario>((resolve)=> {
                resolve(usuario);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar usuario de ID ${usuario.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async delete(usuario:Usuario): Promise<Usuario> {
        const query = "DELETE FROM biblioteca.Usuario where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [usuario.id]);
            console.log('Usuario deletado com sucesso: ', usuario);
            return new Promise<Usuario>((resolve)=> {
                resolve(usuario);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar usuario de ID ${usuario.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async getById(id: number): Promise<Usuario | null> {
        const query = "SELECT * FROM biblioteca.Usuario WHERE id = ?";
    
        try {
            const resultado = await executarComandoSQL(query, [id]);
    
            if (resultado.length === 0) {
                console.log('Usuario não encontrado, com ID: ', id);
                return null;
            }
    
            console.log('Usuario localizado com sucesso, ID: ', resultado);
    
            return new Usuario(resultado[0].id, resultado[0].idPessoa, resultado[0].senha);
    
        } catch (err: any) {
            console.error(`Falha ao procurar usuario de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }
    

    async getAll(): Promise<Usuario[]> {
        const query = "SELECT * FROM biblioteca.Usuario" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Usuario[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os usuarios gerando o erro: ${err}`);
            throw err;
        }
    }

    async getByPessoa(pessoa: number): Promise<Usuario | null> {
        const query = "SELECT * FROM biblioteca.Usuario where idPessoa = ?";

        try {
            const resultado = await executarComandoSQL(query, [pessoa]);

            if(resultado.length === 0) {
                console.log('Usuario não encontrado, com ID: ', pessoa);
                return null;
            }

            console.log('Usuario localizado com sucesso, ID: ', resultado);
            return new Promise<Usuario>((resolve)=> {
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar usuario de ID ${pessoa} gerando o erro: ${err}`);
            throw err;
        }
    }


}