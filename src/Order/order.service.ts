import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { Order } from "@prisma/client";
import { OrderDto } from "./dto/order.dto";
import { PrismaService } from "../prisma.service";
import * as process from "process";

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}

    async create(CreateOrderDto: OrderDto): Promise<Order> {
        return this.prisma.order.create({
            data: CreateOrderDto
        });
    }

    async find(id: number): Promise<Order> {
        if (!+id) throw new HttpException("Order ID is not a number!", 400);
        const order = await this.prisma.order.findUnique({
            where: {
                id: +id
            }
        });
        if (order) {
            return order;
        }
        throw new NotFoundException("No such order!");
    }

    async delete(id: number): Promise<void> {
        const order = await this.find(id);
        if (order) {
            await this.prisma.order.delete({ where: { id: +id } });
        }
    }
}