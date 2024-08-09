import { executarComandoSQL } from "../database/mysql";
import { Categoria } from "../model/Categoria";

export class CategoriaRepository {

        
    private static instance: CategoriaRepository;

    public static getInstance(): CategoriaRepository {
        if (!this.instance) {
            this.instance = new CategoriaRepository();
        }
        return this.instance
    }
    
    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Categoria (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insert(categoria:Categoria): Promise<Categoria> {
        const query = "INSERT INTO biblioteca.Categoria (nome) VALUES (?)" ;

        try {
            const resultado = await executarComandoSQL(query, [categoria.nome]);
            console.log('Categoria inserido(a) com sucesso, ID: ', resultado.insertId);
            categoria.id = resultado.insertId;
            return new Promise<Categoria>((resolve)=> {
                resolve(categoria);
            })
        } catch (err) {
            console.error('Erro ao inserir o categoria:', err);
            throw err;
        }
    }

    async update(categoria:Categoria): Promise<Categoria> {
        const query = "UPDATE biblioteca.Categoria SET nome = ? WHERE (id = ?);"

        try {
            const resultado = await executarComandoSQL(query, [categoria.nome, categoria.id]);
            console.log('Categoria atualizado com sucesso, ID: ', resultado);
            return new Promise<Categoria>((resolve)=> {
                resolve(categoria);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar categoria de ID ${categoria.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async delete(categoria:Categoria): Promise<Categoria> {
        const query = "DELETE FROM biblioteca.Categoria where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [categoria.id]);
            console.log('Categoria deletado com sucesso: ', categoria);
            return new Promise<Categoria>((resolve)=> {
                resolve(categoria);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar categoria de ID ${categoria.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async getById(id: number): Promise<Categoria> {
        const query = "SELECT * FROM biblioteca.Categoria where id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Categoria localizado com sucesso, ID: ', resultado);
            return new Promise<Categoria>((resolve)=> {
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar categoria de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async getAll(): Promise<Categoria[]> {
        const query = "SELECT * FROM biblioteca.Categoria" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Categoria[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os categorias gerando o erro: ${err}`);
            throw err;
        }
    }

}