import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {  Order } from "@prisma/client";
import { OrderService } from "./order.service";
import { OrderDto } from "./dto/order.dto";

@ApiResponse({
    status: 501,
    description: "Not implemented"
})

@ApiTags("Order")
@Controller("order")
export class OrderController {
    constructor(private readonly orderService: OrderService) {
    }

    @ApiOperation({
        summary: "Create order"
    })
    @ApiBody({
        type: OrderDto
    })
    @Post("create")
    async createReview(@Body() CreateOrderDto: OrderDto): Promise<Order> {
        return await this.orderService.create(CreateOrderDto);
    }

    @ApiOperation({
        summary: "Delete order"
    })
    @Delete(":id")
    async deleteOrder(@Param("id") id: number):
        Promise<void> {
        return await this.orderService.delete(id);
    }

    @ApiOperation({
        summary: "Read order"
    })
    @Get(":id")
    async getOrder(@Param("id") id: number):
        Promise<Order> {
        return await this.orderService.find(id);
    }
}
