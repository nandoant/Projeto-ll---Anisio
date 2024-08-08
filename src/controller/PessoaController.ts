import { Request, Response } from "express";
import { Controller, Delete, Get, Put, Query } from "tsoa";
import { Body, Post, Res, Route, Tags, TsoaResponse } from "@tsoa/runtime";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { ProductRequestDto } from "../model/dto/ProductRequestDto";
import { PessoaService } from "../service/PessoaService";
import { PessoaRequestDto } from "../model/dto/PessoaRequestDto";


@Route("pessoa")
@Tags("Pessoa")
export class PessoaController extends Controller{
    private pessoaService = new PessoaService();


    @Post()
    async cadastrarProduto(
        @Body() dto: PessoaRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoa = await this.pessoaService.cadastrarPessoa(dto);
            return success(201, new BasicResponseDto("Pessoa criada com sucesso!", pessoa));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };    

    @Put()
    async atualizarProduto (
        @Body() dto: PessoaRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ):Promise<void> {
        try {
            const produto = await this.pessoaService.atualizarPessoa(dto);
            return success(200, new BasicResponseDto("Produto atualizado com sucesso!", produto));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };

    @Delete()
    async deletarProduto (
        @Body() dto: PessoaRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ):Promise<void> {
        try {
            const produto = await this.pessoaService.deletarPessoa(dto);
            return success(200, new BasicResponseDto("Produto deletado com sucesso!", produto));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };

    @Get()
    async filtrarProduto (
        @Query() id: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ){
        try {
            const produto = await this.pessoaService.filtrarPessoa(id);
            return success(200, new BasicResponseDto("Produto encontrado com sucesso!", produto));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };

    @Get("all")
    async listarTodosProduto (
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ){
        try {
            const produtos = await this.pessoaService.listarTodasPessoas();
            return success(200, new BasicResponseDto("Produtos encontrados com sucesso!", produtos));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

}