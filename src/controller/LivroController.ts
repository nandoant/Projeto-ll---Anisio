import { Body, Controller, Delete, Get, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { LivroService } from "../service/LivroService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { LivroRequestDto } from "../model/dto/LivroRequestDto";

@Route("livro")
@Tags("Livro")
export class LivroController {
    private livroService = new LivroService();


    @Post()
    async cadastrarLivro(
        @Body() dto: LivroRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const Livro = await this.livroService.cadastrarLivro(dto);
            return success(201, new BasicResponseDto("Livro criada com sucesso!", Livro));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };    

    @Put()
    async atualizarLivro (
        @Body() dto: LivroRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ):Promise<void> {
        try {
            const livro = await this.livroService.atualizarLivro(dto);
            return success(200, new BasicResponseDto("Livro atualizado com sucesso!", livro));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };

    @Delete()
    async deletarLivro (
        @Body() dto: LivroRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ):Promise<void> {
        try {
            const livro = await this.livroService.deletarLivro(dto);
            return success(200, new BasicResponseDto("Livro deletado com sucesso!", livro));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };

    @Get()
    async filtrarLivro (
        @Query() id: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ){
        try {
            const livro = await this.livroService.filtrarLivro(id);
            return success(200, new BasicResponseDto("Livro encontrado com sucesso!", livro));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };

    @Get("all")
    async listarTodosLivros (
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ){
        try {
            const livros = await this.livroService.listarTodasLivros();
            return success(200, new BasicResponseDto("Livros encontrados com sucesso!", livros));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
}