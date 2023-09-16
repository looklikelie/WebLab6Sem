import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "@prisma/client";
import { ProductDto } from "./dto/product.dto";
import { PrismaService } from "../prisma.service";
import * as process from "process";

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async create(CreateProductDto: ProductDto): Promise<Product> {
        return this.prisma.product.create({
            data: CreateProductDto
        });
    }

    async find(id: number): Promise<Product> {
        if (!+id) throw new HttpException("Product ID is not a number!", 400);
        const product = await this.prisma.product.findUnique({
            where: {
                id: +id
            }
        });
        if (product) {
            return product;
        }
        throw new NotFoundException("No such product!");
    }

    async update(id: number, CreateProductDto: ProductDto): Promise<Product> {
        const { title, content, price} = CreateProductDto;
        const product = await this.prisma.product.update({
            where: {
                id: +id
            },
            data: {
                title: title,
                content: content,
                price: price
            }
        });
        if (product) {
            return product;
        }
        throw new NotFoundException("No such product!");
    }

    async delete(id: number): Promise<void> {
        const product = await this.find(id);
        if (product) {
            await this.prisma.product.delete({ where: { id: +id } });
        }
    }
}