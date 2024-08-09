import { executarComandoSQL } from "../database/mysql";
import { Livro } from "../model/Livro";

export class LivroRepository {
        
    private static instance: LivroRepository;

    public static getInstance(): LivroRepository {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance
    }
    
    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Livro (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            autor VARCHAR(255) NOT NULL,
            categoriaId INT NOT NULL
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insert(livro:Livro): Promise<Livro> {
        const query = "INSERT INTO biblioteca.Livro (titulo, autor, categoriaId) VALUES (?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [livro.titulo, livro.autor, livro.categoriaId]);
            console.log('Livro inserido(a) com sucesso, ID: ', resultado.insertId);
            livro.id = resultado.insertId;
            return new Promise<Livro>((resolve)=> {
                resolve(livro);
            })
        } catch (err) {
            console.error('Erro ao inserir o livro:', err);
            throw err;
        }
    }

    async update(livro:Livro): Promise<Livro> {
        const query = "UPDATE biblioteca.livro SET autor = ?, titulo = ?, categoriaId = ? WHERE (id = ?);"

        try {
            const resultado = await executarComandoSQL(query, [livro.autor, livro.titulo,livro.categoriaId, livro.id]);
            console.log('Livro atualizado com sucesso, ID: ', resultado);
            return new Promise<Livro>((resolve)=> {
                resolve(livro);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar livro de ID ${livro.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async delete(livro:Livro): Promise<Livro> {
        const query = "DELETE FROM biblioteca.Livro where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [livro.id]);
            console.log('Livro deletado com sucesso: ', livro);
            return new Promise<Livro>((resolve)=> {
                resolve(livro);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar livro de ID ${livro.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async getById(id: number): Promise<Livro> {
        const query = "SELECT * FROM biblioteca.Livro where id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Livro localizado com sucesso, ID: ', resultado);
            return new Promise<Livro>((resolve)=> {
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async getAll(): Promise<Livro[]> {
        const query = "SELECT * FROM biblioteca.Livro" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Livro[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os livros gerando o erro: ${err}`);
            throw err;
        }
    }


    async getByCategoriaId(idCategoria: number): Promise<Livro | null> {
        const query = "SELECT * FROM biblioteca.Livro WHERE categoriaId = ?";
    
        try {
            const resultados = await executarComandoSQL(query, [idCategoria]);
    
            if (resultados.length === 0) {
                return null;
            }
    
            const resultado = resultados[0];
            const livro = new Livro(resultado.id, resultado.titulo, resultado.autor, resultado.categoriaId);
            console.log('Livro localizado com sucesso, ID: ', livro.id);
            return livro;
    
        } catch (err: any) {
            console.error(`Falha ao procurar livro de ID ${idCategoria}, erro: ${err}`);
            throw err;
        }
    }
    

}