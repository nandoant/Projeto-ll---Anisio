import { Body, Controller, Delete, Get, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { CategoriaService } from "../service/EmprestimoService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { CategoriaResponseDto } from "../model/dto/CategoriaResponseDto";


@Route("categoria")
@Tags("Categoria")
export class CategoriaController extends Controller{
    
    private categoriaService = new CategoriaService();


    @Post()
    async cadastrarCategoria(
        @Body() dto: CategoriaResponseDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const categoria = await this.categoriaService.cadastrarCategoria(dto);
            return success(201, new BasicResponseDto("Categoria criada com sucesso!", categoria));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };    

    @Put()
    async atualizarCategoria (
        @Body() dto: CategoriaResponseDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ):Promise<void> {
        try {
            const categoria = await this.categoriaService.atualizarCategoria(dto);
            return success(200, new BasicResponseDto("Categoria atualizado com sucesso!", categoria));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };

    @Delete()
    async deletarCategoria (
        @Body() dto: CategoriaResponseDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ):Promise<void> {
        try {
            const categoria = await this.categoriaService.deletarCategoria(dto);
            return success(200, new BasicResponseDto("Categoria deletado com sucesso!", categoria));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };

    @Get()
    async filtrarCategoria (
        @Query() id: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ){
        try {
            const categoria = await this.categoriaService.filtrarCategoria(id);
            return success(200, new BasicResponseDto("Categoria encontrado com sucesso!", categoria));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };

    @Get("all")
    async listarTodosCategorias (
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ){
        try {
            const emprestimoss = await this.categoriaService.listarTodasCategorias();
            return success(200, new BasicResponseDto("Categorias encontrados com sucesso!", emprestimoss));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

}