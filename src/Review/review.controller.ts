import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {  Review } from "@prisma/client";
import { ReviewService } from "./review.service";
import { ReviewDto } from "./dto/review.dto";

@ApiResponse({
  status: 501,
  description: "Not implemented"
})

@ApiTags("Review")
@Controller("review")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {
  }

  @ApiOperation({
    summary: "Create review"
  })
  @ApiBody({
    type: ReviewDto
  })
  @Post("create")
  async createReview(@Body() CreateReviewDto: ReviewDto): Promise<Review> {
    return await this.reviewService.create(CreateReviewDto);
  }

  @ApiOperation({
    summary: "Update Review"
  })
  @Post(":id/update")
  async updateReview(@Param("id", ParseIntPipe) id: number,
                      @Body() ReviewDto: ReviewDto):
      Promise<Review> {
    return await this.reviewService.update(id, ReviewDto);
  }

  @ApiOperation({
    summary: "Delete review"
  })
  @Delete(":id")
  async deleteReview(@Param("id") id: number):
      Promise<void> {
    return await this.reviewService.delete(id);
  }

  @ApiOperation({
    summary: "Find all review"
  })
  @Get("/all")
  async getAllReview():
      Promise<Review[]> {
    return await this.reviewService.getAll();
  }

  @ApiOperation({
    summary: "Find review"
  })
  @Get(":id")
  async getReview(@Param("id") id: number):
      Promise<Review> {
    return await this.reviewService.find(id);
  }
}
