import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CategoryEntity } from "./category.entity";

@Entity({ name: "courses" })
export class CourseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @Column({ type: "varchar", nullable: false })
  description!: string;

  @Column({ type: "float", nullable: false })
  value!: number;

  @Column({ type: "varchar", nullable: false })
  image!: string;

  @Column({ type: "boolean", nullable: false })
  disponibility!: boolean;

  @ManyToOne(() => CategoryEntity, (category) => category.courses, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "category_id", referencedColumnName: "id" })
  category!: CategoryEntity;
}
