import { stringParaData, verificaFormatoData } from "../util/DataUtil";

export class Emprestimo {
    id: number;
    livroId: number;
    usuarioId: number;
    dataEmprestimo: Date;
    dataDevolucao: Date;

    constructor(id?: number, livroId?: number, usuarioId?: number, dataEmprestimo?: string, dataDevolucao?: string) {
        this.validateEmprestimoData(livroId, usuarioId, dataEmprestimo, dataDevolucao);

        this.id = id || 0;
        this.livroId = livroId || 0;
        this.usuarioId = usuarioId || 0;

        this.dataEmprestimo = stringParaData(dataEmprestimo || '');
        this.dataDevolucao = stringParaData(dataDevolucao || '');
    }

    private validateEmprestimoData(livroId?: number, usuarioId?: number, dataEmprestimo?: string, dataDevolucao?: string): void {
        let error = '';

        if (!livroId || typeof livroId !== 'number' || livroId <= 0) {
            error += 'livroId inválido. ';
        }

        if (!usuarioId || typeof usuarioId !== 'number' || usuarioId <= 0) {
            error += 'usuarioId inválido. ';
        }

        if (!dataEmprestimo || !verificaFormatoData(dataEmprestimo)) {
            error += 'dataEmprestimo inválida, formato: dd/mm/aaaa. ';
        }

        if (!dataDevolucao || !verificaFormatoData(dataDevolucao)) {
            error += 'dataDevolucao inválida, formato: dd/mm/aaaa. ';
        }

        if (dataEmprestimo && dataDevolucao && new Date(dataDevolucao) < new Date(dataEmprestimo)) {
            error += 'dataDevolucao não pode ser anterior a dataEmprestimo. ';
        }

        if (error) {
            throw new Error(error.trim());
        }
    }

}
