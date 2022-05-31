import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CourseEntity } from "./course.entity";

@Entity({ name: "categories" })
export class CategoryEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @OneToMany(() => CourseEntity, (course) => course.category)
  courses?: CourseEntity[];
}
