import { HttpException, Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserDto } from "./dto/user.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(CreateUserDto: UserDto): Promise<User> {
        return this.prisma.user.create({
            data: CreateUserDto
        });
    }

    async find(id: number): Promise<User> {
        if (!+id) throw new HttpException("User ID is not a number!", 400);
        const user = await this.prisma.user.findUnique({
            where: {
                id: +id
            }
        });
        if (user) {
            return user;
        }
        throw new NotFoundException("No such user!");
    }

    async update(id: number, CreateUserDto: UserDto): Promise<User> {
        const { name, email} = CreateUserDto;
        const user = await this.prisma.user.update({
            where: {
                id: +id
            },
            data: {
                email: email,
                name: name
            }
        });
        if (user) {
            return user;
        }
        throw new NotFoundException("No such user!");
    }

    async delete(id: number): Promise<void> {
        const user = await this.find(id);
        if (user) {
            await this.prisma.user.delete({ where: { id: +id } });
        }
    }
}