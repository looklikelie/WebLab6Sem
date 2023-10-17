import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get, GoneException,
    Param,
    ParseIntPipe,
    Post,
    UseFilters
} from "@nestjs/common";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import { Review } from "@prisma/client";
import { ReviewService } from "./review.service";
import { ReviewDto } from "./dto/review.dto";
import {HttpExceptionFilter} from "../http-exception.filter";

@ApiTags("Review")
@Controller("review")
@UseFilters(new HttpExceptionFilter())
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {
    }

    @ApiOperation({
      summary: "Create review"
    })
    @ApiResponse({
      status: 201,
      description: 'The review has been successfully created.'
    })
    @ApiResponse({
      status: 403,
      description: 'Forbidden.'
    })
    @ApiBody({
      type: ReviewDto
    })
    @Post("create")
    async createReview(@Body() CreateReviewDto: ReviewDto): Promise<Review> {
        try{
            return await this.reviewService.create(CreateReviewDto);
        }
        catch (error){
            throw new BadRequestException();
        }
    }

    @ApiOperation({
        summary: "Find all review"
    })
    @ApiResponse({
        status: 200,
        description: 'All review has been successfully received.'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.'
    })
    @Get("/all")
    async getAllReview():
        Promise<Review[]> {
        try{
            return await this.reviewService.getAllRev();
        }
        catch (error){
            throw new GoneException();
        }
    }

    @ApiOperation({
      summary: "Update Review"
    })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiResponse({
      status: 200,
      description: 'The review has been successfully updated.'
    })
    @ApiResponse({
      status: 400,
      description: 'There is no review with this ID'
    })
    @ApiResponse({
      status: 403,
      description: 'Forbidden.'
    })
    @Post(":id/update")
    async updateReview(@Param("id", ParseIntPipe) id: number,
                        @Body() ReviewDto: ReviewDto):
        Promise<Review> {
        try{
            return await this.reviewService.update(id, ReviewDto);
        }
        catch (error){
            throw new BadRequestException();
        }
    }

    @ApiOperation({
      summary: "Delete review"
    })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiResponse({
      status: 200,
      description: 'The review has been successfully deleted.'
    })
    @ApiResponse({
      status: 400,
      description: 'There is no review with this ID'
    })
    @ApiResponse({
      status: 403,
      description: 'Forbidden.'
    })
    @Delete(":id")
    async deleteReview(@Param("id", ParseIntPipe) id: number):
        Promise<void> {
        try{
            return await this.reviewService.delete(id);
        }
        catch (error){
            throw new BadRequestException();
        }
    }

    @ApiOperation({
      summary: "Find review"
    })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiResponse({
      status: 200,
      description: 'The review has been successfully received.'
    })
    @ApiResponse({
      status: 400,
      description: 'There is no review with this ID'
    })
    @ApiResponse({
      status: 403,
      description: 'Forbidden.'
    })
    @Get(":id")
    async getReview(@Param("id", ParseIntPipe) id: number):
        Promise<Review> {
        try{
            return await this.reviewService.find(id);
        }
        catch (error){
            throw new BadRequestException();
        }
    }
}
