import { CourseEntity } from "../../entities/course.entity";
import { CreateCourseDto } from "./create-course.dto";

export class CreatedCourseDto extends CreateCourseDto {
  id!: string;

  constructor({
    name,
    description,
    value,
    disponibility,
    image,
    id,
    category,
  }: CourseEntity) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.value = value;
    this.disponibility = disponibility;
    this.image = image;
    this.categoryId = category.id;
  }
}
