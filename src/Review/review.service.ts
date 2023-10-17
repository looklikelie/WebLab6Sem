import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../prisma.service';
import { Review } from '@prisma/client';
import { ReviewDto } from "./dto/review.dto";

@Injectable()
export class ReviewService {
    constructor(private prisma: PrismaService) {}

    async create(CreateReviewDto: ReviewDto): Promise<Review> {
        return this.prisma.review.create({
            data: CreateReviewDto
        });
    }

    async find(id: number): Promise<Review> {
        if (!+id) throw new HttpException("Review ID is not a number!", 400);
        const review = await this.prisma.review.findUnique({
            where: {
                id: +id
            }
        });
        if (review) {
            return review;
        }
        throw new NotFoundException("No such review!");
    }

    async update(id: number, CreateReviewDto: ReviewDto): Promise<Review> {
        const { text} = CreateReviewDto;
        const review = await this.prisma.review.update({
            where: {
                id: id
            },
            data: {
                text: text
            }
        });
        if (review) {
            return review;
        }
        throw new NotFoundException("No such review!");
    }

    async delete(id: number): Promise<void> {
        const review = await this.find(id);
        if (review) {
            await this.prisma.review.delete({ where: { id: +id } });
        }
    }

    async getAll(): Promise<Review[]> {
        return this.prisma.review.findMany();
    }
}