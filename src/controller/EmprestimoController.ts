import { Body, Controller, Delete, Get, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { EmprestimoService } from "../service/EmprestimoService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { EmprestimoResponseDto } from "../model/dto/EmprestimoResponseDto";


@Route("emprestimo")
@Tags("Emprestimo")
export class EmprestimoController extends Controller{
    
    private emprestimoService = new EmprestimoService();


    @Post()
    async cadastrarEmprestimo(
        @Body() dto: EmprestimoResponseDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimo = await this.emprestimoService.cadastrarEmprestimo(dto);
            return success(201, new BasicResponseDto("Emprestimo criada com sucesso!", emprestimo));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };    

    @Put()
    async atualizarEmprestimo (
        @Body() dto: EmprestimoResponseDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ):Promise<void> {
        try {
            const emprestimo = await this.emprestimoService.atualizarEmprestimo(dto);
            return success(200, new BasicResponseDto("Emprestimo atualizado com sucesso!", emprestimo));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };

    @Delete()
    async deletarEmprestimo (
        @Body() dto: EmprestimoResponseDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ):Promise<void> {
        try {
            const emprestimo = await this.emprestimoService.deletarEmprestimo(dto);
            return success(200, new BasicResponseDto("Emprestimo deletado com sucesso!", emprestimo));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };

    @Get()
    async filtrarEmprestimo (
        @Query() id: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ){
        try {
            const emprestimo = await this.emprestimoService.filtrarEmprestimo(id);
            return success(200, new BasicResponseDto("Emprestimo encontrado com sucesso!", emprestimo));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };

    @Get("all")
    async listarTodosEmprestimos (
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ){
        try {
            const emprestimoss = await this.emprestimoService.listarTodasEmprestimos();
            return success(200, new BasicResponseDto("Emprestimos encontrados com sucesso!", emprestimoss));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

}