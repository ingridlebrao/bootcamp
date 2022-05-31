import { CourseService } from "../services/course.service";
import { Request, Response } from "express";
import { HttpStatus } from "../utils/enums/http-status.enum";
import { CreatedCategoryDto } from "../dtos/category/created-category.dto";

export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  async create(
    { body, file }: Request,
    response: Response
  ): Promise<Response<CreatedCategoryDto>> {
    const course = await this.courseService.create({
      ...body,
      image: file?.filename,
    });
    return response.status(HttpStatus.CREATED).json(course);
  }

  async getAll(
    _request: Request,
    response: Response
  ): Promise<Response<CreatedCategoryDto[]>> {
    const courses = await this.courseService.getAll();
    return response.status(HttpStatus.OK).json(courses);
  }

  async show({ params }: Request, response: Response) {
    const course = await this.courseService.show(params.id);
    return response.status(HttpStatus.OK).json(course);
  }
}
