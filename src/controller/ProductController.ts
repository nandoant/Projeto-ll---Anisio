import { Request, Response } from "express";
import { ProductService } from "../service/ProductService";
import { Controller, Delete, Get, Put, Query } from "tsoa";
import { Body, Post, Res, Route, Tags, TsoaResponse } from "@tsoa/runtime";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { ProductRequestDto } from "../model/dto/ProductRequestDto";


@Route("product")
@Tags("Product")
export class ProductController extends Controller{
    private productService = new ProductService();


    @Post()
    async cadastrarProduto(
        @Body() dto: ProductRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const product = await this.productService.cadastrarProduto(dto);
            return success(201, new BasicResponseDto("Produto criado com sucesso!", product));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };    

    @Put()
    async atualizarProduto (
        @Body() dto: ProductRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ):Promise<void> {
        try {
            const produto = await this.productService.atualizarProduto(dto);
            return success(200, new BasicResponseDto("Produto atualizado com sucesso!", produto));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    };

    @Delete()
    async deletarProduto (
        @Body() dto: ProductRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ):Promise<void> {
        try {
            const produto = await this.productService.deletarProduto(dto);
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
            const produto = await this.productService.filtrarProduto(id);
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
            const produtos = await this.productService.listarTodosProdutos();
            return success(200, new BasicResponseDto("Produtos encontrados com sucesso!", produtos));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

}