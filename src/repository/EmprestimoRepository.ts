import { executarComandoSQL } from "../database/mysql";
import { Emprestimo } from "../model/Emprestimo";

export class EmprestimoRepository {

    private static instance: EmprestimoRepository;

    public static getInstance(): EmprestimoRepository {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance
    }
    
    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Emprestimo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            livroId INT NOT NULL,
            usuarioId INT NOT NULL,
            dataEmprestimo DATE NOT NULL,
            dataDevolucao DATE NOT NULL
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insert(emprestimo:Emprestimo): Promise<Emprestimo> {
        const query = "INSERT INTO biblioteca.Emprestimo (livroId, usuarioId, dataEmprestimo, dataDevolucao) VALUES (?, ?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [emprestimo.livroId, emprestimo.usuarioId, emprestimo.dataEmprestimo, emprestimo.dataDevolucao]);
            console.log('Emprestimo inserido(a) com sucesso, ID: ', resultado.insertId);
            emprestimo.id = resultado.insertId;
            return new Promise<Emprestimo>((resolve)=> {
                resolve(emprestimo);
            })
        } catch (err) {
            console.error('Erro ao inserir o Emprestimo:', err);
            throw err;
        }
    }

    async update(emprestimo:Emprestimo): Promise<Emprestimo> {
        const query = "UPDATE biblioteca.Emprestimo SET livroId = ?, usuarioId = ?, dataEmprestimo = ?, dataDevolucao = ? WHERE (id = ?);"

        try {
            const resultado = await executarComandoSQL(query, [emprestimo.livroId, emprestimo.usuarioId, emprestimo.dataEmprestimo, emprestimo.dataDevolucao, emprestimo.id]);
            console.log('Emprestimo atualizado com sucesso, ID: ', resultado);
            return new Promise<Emprestimo>((resolve)=> {
                resolve(emprestimo);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar emprestimo de ID ${emprestimo.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async delete(emprestimo:Emprestimo): Promise<Emprestimo> {
        const query = "DELETE FROM biblioteca.Emprestimo where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [emprestimo.id]);
            console.log('Emprestimo deletado com sucesso: ', emprestimo);
            return new Promise<Emprestimo>((resolve)=> {
                resolve(emprestimo);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar emprestimo de ID ${emprestimo.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async getById(id: number): Promise<Emprestimo> {
        const query = "SELECT * FROM biblioteca.Emprestimo where id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Emprestimo localizado com sucesso, ID: ', resultado);
            const emprestimo = await new Promise<Emprestimo>((resolve)=> {
                resolve(resultado);
            })
            
            emprestimo.id = resultado[0].id;
            emprestimo.livroId = resultado[0].livroId;
            emprestimo.usuarioId = resultado[0].usuarioId;
            
            return emprestimo;
        } catch (err:any) {
            console.error(`Falha ao procurar emprestimo de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async getAll(): Promise<Emprestimo[]> {
        const query = "SELECT * FROM biblioteca.Emprestimo" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Emprestimo[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar as emprestimos gerando o erro: ${err}`);
            throw err;
        }
    }

    async getByLivroId(livroId: number): Promise<Emprestimo | null> {
        const query = "SELECT * FROM biblioteca.Emprestimo WHERE livroId = ?";
    
        try {
            const resultados = await executarComandoSQL(query, [livroId]);
    
            if (resultados.length === 0) {
                return null;
            }
    
            console.log('Emprestimo localizado com sucesso, Livro ID: ', livroId);
            return new Promise<Emprestimo>((resolve)=>{
                resolve(resultados);
            })
    
        } catch (err) {
            console.error(`Erro ao procurar emprestimo por Livro ID ${livroId}, erro: ${err}`);
            throw err;
        }
    }

    async getByUsuarioId(usuarioId: number): Promise<Emprestimo | null> {
        const query = "SELECT * FROM biblioteca.Emprestimo WHERE usuarioId = ?";
    
        try {
            const resultados = await executarComandoSQL(query, [usuarioId]);
    
            if (resultados.length === 0) {
                return null;
            }
    
            console.log('Emprestimo localizado com sucesso, Livro ID: ', usuarioId);
            return new Promise<Emprestimo>((resolve)=>{
                resolve(resultados);
            })
    
        } catch (err) {
            console.error(`Erro ao procurar emprestimo por Usuario ID ${usuarioId}, erro: ${err}`);
            throw err;
        }
    }

}