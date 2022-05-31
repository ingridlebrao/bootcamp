import { CourseService } from "../services/course.service";
import { Request, Response } from "express";
import { HttpStatus } from "../utils/enums/http-status.enum";
import { CreatedCourseDto } from "../dtos/course/created-course.dto";
import { CreateCourseDto } from "../dtos/course/create-course.dto";
import { UpdateCourseDto } from "../dtos/course/update-course.dto";

interface CreateCourseBody extends Request {
  body: CreateCourseDto;
}
interface UpdateCourseBody extends Request {
  body: Partial<UpdateCourseDto>;
}
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  async create(
    { body, file }: CreateCourseBody,
    response: Response
  ): Promise<Response<CreatedCourseDto>> {
    const course = await this.courseService.create({
      ...body,
      image: file!.filename,
    });
    return response.status(HttpStatus.CREATED).json(course);
  }

  async getAll(
    _request: Request,
    response: Response
  ): Promise<Response<CreatedCourseDto[]>> {
    const courses = await this.courseService.getAll();
    return response.status(HttpStatus.OK).json(courses);
  }

  async show(
    { params }: Request,
    response: Response
  ): Promise<Response<CreatedCourseDto>> {
    const course = await this.courseService.show(params.id);
    return response.status(HttpStatus.OK).json(course);
  }

  async update(
    { body, file, params }: UpdateCourseBody,
    response: Response
  ): Promise<Response<void>> {
    await this.courseService.update(params.id, {
      ...body,
      image: file?.filename,
    });
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
