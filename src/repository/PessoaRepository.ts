import { executarComandoSQL } from "../database/mysql";
import { Pessoa } from "../model/Pessoa";

export class PessoaRepository {

    private static instance: PessoaRepository;

    public static getInstance(): PessoaRepository {
        if (!this.instance) {
            this.instance = new PessoaRepository();
        }
        return this.instance
    }
    
    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Pessoa (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insert(pessoa:Pessoa): Promise<Pessoa> {
        const query = "INSERT INTO biblioteca.Pessoa (nome, email) VALUES (?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [pessoa.nome, pessoa.email]);
            console.log('Pessoa inserido(a) com sucesso, ID: ', resultado.insertId);
            pessoa.id = resultado.insertId;
            return new Promise<Pessoa>((resolve)=> {
                resolve(pessoa);
            })
        } catch (err) {
            console.error('Erro ao inserir o pessoa:', err);
            throw err;
        }
    }

    async update(pessoa:Pessoa): Promise<Pessoa> {
        const query = "UPDATE biblioteca.pessoa SET nome = ?, email = ? WHERE (id = ?);"

        try {
            const resultado = await executarComandoSQL(query, [pessoa.nome, pessoa.email, pessoa.id]);
            console.log('Pessoa atualizado com sucesso, ID: ', resultado);
            return new Promise<Pessoa>((resolve)=> {
                resolve(pessoa);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar pessoa de ID ${pessoa.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async delete(pessoa:Pessoa): Promise<Pessoa> {
        const query = "DELETE FROM biblioteca.Pessoa where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [pessoa.id]);
            console.log('Pessoa deletado com sucesso: ', pessoa);
            return new Promise<Pessoa>((resolve)=> {
                resolve(pessoa);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar pessoa de ID ${pessoa.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async getById(id: number): Promise<Pessoa | null> {
        const query = "SELECT * FROM biblioteca.Pessoa where id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);

            if(resultado.length === 0) {
                console.log('Pessoa não encontrada, id: ', id);
                return null;
            }

            console.log('Pessoa localizado com sucesso, ID: ', resultado);
            return new Pessoa(resultado[0].id, resultado[0].nome, resultado[0].email);
        } catch (err:any) {
            console.error(`Falha ao procurar pessoa de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async getAll(): Promise<Pessoa[]> {
        const query = "SELECT * FROM biblioteca.Pessoa" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Pessoa[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar as pessoas gerando o erro: ${err}`);
            throw err;
        }
    }

    
}