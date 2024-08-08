import { Pessoa } from "./Pessoa";

export class Usuario extends Pessoa{
    senha: string

    constructor(id:number, nome:string, email:string, senha:string){
        super(id, nome, email);
        this.senha = senha;
    }
}