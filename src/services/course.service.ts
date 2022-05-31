import { Repository, DataSource } from "typeorm";
import { CreateCourseDto } from "../dtos/course/create-course.dto";
import { CreatedCourseDto } from "../dtos/course/created-course.dto";
import { CourseEntity } from "../entities/course.entity";
import { HttpException } from "../handler-exceptions/http-exception.provider";
import { HttpStatus } from "../utils/enums/http-status.enum";

export class CourseService {
  private courseRepository: Repository<CourseEntity>;

  constructor(private readonly connection: DataSource) {
    this.courseRepository = this.connection.getRepository(CourseEntity);
  }
  async create({
    categoryId,
    description,
    disponibility,
    image,
    name,
    value,
  }: CreateCourseDto): Promise<CreatedCourseDto> {
    try {
      const createCourse = this.courseRepository.create({
        category: { id: categoryId },
        description,
        disponibility,
        image,
        name,
        value,
      });
      const saveCourse = await this.courseRepository.save(createCourse);
      return new CreatedCourseDto(saveCourse);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        "Houve um erro ao cadastrar curso!",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async getAll(): Promise<CreatedCourseDto[]> {
    try {
      const courses = await this.courseRepository.find({
        relations: ["category"],
      });
      return courses.map((course) => new CreatedCourseDto(course));
    } catch (error) {
      console.log(error);
      throw new HttpException(
        "Houve um erro ao listar cursos!",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async show(id: string): Promise<CreatedCourseDto> {
    try {
      const course = await this.courseRepository.findOne({
        relations: ["category"],
        where: { id },
      });
      if (!course) {
        throw new HttpException("Curso não encontrado!", HttpStatus.NOT_FOUND);
      }
      return new CreatedCourseDto(course);
    } catch (error) {
      throw new HttpException(
        "Houve um erro ao recuperar curso!",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
