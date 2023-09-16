import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {  User } from "@prisma/client";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";

@ApiResponse({
    status: 501,
    description: "Not implemented"
})

@ApiTags("User")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @ApiOperation({
        summary: "Create user"
    })
    @ApiBody({
        type: UserDto
    })
    @Post("create")
    async createReview(@Body() CreateUserDto: UserDto): Promise<User> {
        return await this.userService.create(CreateUserDto);
    }

    @ApiOperation({
        summary: "Update User"
    })
    @Post(":id/update")
    async updateUser(@Param("id", ParseIntPipe) id: number,
                       @Body() UserDto: UserDto):
        Promise<User> {
        return await this.userService.update(id, UserDto);
    }

    @ApiOperation({
        summary: "Delete user"
    })
    @Delete(":id")
    async deleteUser(@Param("id") id: number):
        Promise<void> {
        return await this.userService.delete(id);
    }

    @ApiOperation({
        summary: "Read user"
    })
    @Get(":id")
    async getUser(@Param("id") id: number):
        Promise<User> {
        return await this.userService.find(id);
    }
}
