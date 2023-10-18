import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseFilters, UseGuards
} from "@nestjs/common";
import {ApiBasicAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {  User } from "@prisma/client";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import {HttpExceptionFilter} from "../http-exception.filter";
import {AuthGuard} from "../auth/auth.guard";

@ApiResponse({
    status: 501,
    description: "Not implemented"
})

@ApiTags("User")
@Controller("user")
@UseFilters(new HttpExceptionFilter())
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @ApiOperation({
        summary: "Create user"
    })
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully created.'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.'
    })
    @ApiBody({
        type: UserDto
    })
    @Post("create")
    @ApiBasicAuth()
    @UseGuards(new AuthGuard())
    async createUser(@Body() CreateUserDto: UserDto): Promise<User> {
        try{
            return await this.userService.create(CreateUserDto);
        }
        catch (error){
            throw new BadRequestException();
        }
    }

    @ApiOperation({
        summary: "Update User"
    })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiResponse({
        status: 200,
        description: 'The user has been successfully updated.'
    })
    @ApiResponse({
        status: 400,
        description: 'There is no user with this ID'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.'
    })
    @Post(":id/update")
    @ApiBasicAuth()
    @UseGuards(new AuthGuard())
    async updateUser(@Param("id", ParseIntPipe) id: number,
                       @Body() UserDto: UserDto):
        Promise<User> {
        try{
            return await this.userService.update(id, UserDto);
        }
        catch (error){
            throw new BadRequestException();
        }
    }

    @ApiOperation({
        summary: "Delete user"
    })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiResponse({
        status: 200,
        description: 'The user has been successfully deleted.'
    })
    @ApiResponse({
        status: 400,
        description: 'There is no user with this ID'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.'
    })
    @Delete(":id")
    @ApiBasicAuth()
    @UseGuards(new AuthGuard())
    async deleteUser(@Param("id") id: number):
        Promise<void> {
        try{
            return await this.userService.delete(id);
        }
        catch (error){
            throw new BadRequestException();
        }
    }

    @ApiOperation({
        summary: "Get user"
    })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiResponse({
        status: 200,
        description: 'The user has been successfully received.'
    })
    @ApiResponse({
        status: 400,
        description: 'There is no user with this ID'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.'
    })
    @Get(":id")
    @ApiBasicAuth()
    @UseGuards(new AuthGuard())
    async getUser(@Param("id") id: number):
        Promise<User> {
        try{
            return await this.userService.find(id);
        }
        catch (error){
            throw new BadRequestException();
        }
    }
}
