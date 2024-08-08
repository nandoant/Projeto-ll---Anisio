import { Body, Controller, Delete, Get, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { UsuarioService } from "../service/UsuarioService";
import { UsuarioRequestDto } from "../model/dto/UsuarioRequestDtp";

@Route("usuario")
@Tags("Usuario")
export class UsuarioController extends Controller{
    private usuarioService = new UsuarioService();


    @Post()
    async cadastrarUsuario(
        @Body() dto: UsuarioRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.cadastrarUsuario(dto);
            return success(201, new BasicResponseDto("Usuario criada com sucesso!", usuario));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };    

    @Put()
    async atualizarUsuario (
        @Body() dto: UsuarioRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ):Promise<void> {
        try {
            const usuario = await this.usuarioService.atualizarUsuario(dto);
            return success(200, new BasicResponseDto("Usuario atualizado com sucesso!", usuario));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };

    @Delete()
    async deletarUsuario (
        @Body() dto: UsuarioRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ):Promise<void> {
        try {
            const usuario = await this.usuarioService.deletarUsuario(dto);
            return success(200, new BasicResponseDto("Usuario deletado com sucesso!", usuario));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };

    @Get()
    async filtrarUsuario (
        @Query() id: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ){
        try {
            const usuario = await this.usuarioService.filtrarUsuario(id);
            return success(200, new BasicResponseDto("Usuario encontrado com sucesso!", usuario));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };

    @Get("all")
    async listarTodosUsuarios (
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ){
        try {
            const usuarios = await this.usuarioService.listarTodasUsuarios();
            return success(200, new BasicResponseDto("Usuarios encontrados com sucesso!", usuarios));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

}