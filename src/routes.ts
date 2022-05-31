import { Router, Request, Response, NextFunction } from "express";
import multer from "multer";
import { AppDataSource } from "./config/data-source";
import { multerConfig } from "./config/multer";
import { CategoryController } from "./controllers/category.controller";
import { CourseController } from "./controllers/course.controller";
import { CreateCategoryDto } from "./dtos/category/create-category.dto";
import { UpdateCategoryDto } from "./dtos/category/update-category.dto";
import { CreateCourseDto } from "./dtos/course/create-course.dto";
import { UpdateCourseDto } from "./dtos/course/update-course.dto";
import { validator } from "./middlewares";
import { CategoryService } from "./services/category.service";
import { CourseService } from "./services/course.service";

const routes = Router();

const categoryController = new CategoryController(
  new CategoryService(AppDataSource)
);

const courseController = new CourseController(new CourseService(AppDataSource));

routes.get("/", (_request: Request, response: Response) => {
  return response.json({ status: "success", version: "1.0.0" }).status(200);
});

routes.get(
  "/categories",
  (request: Request, response: Response, next: NextFunction) => {
    categoryController.getAll(request, response).catch((error: Error) => {
      next(error);
    });
  }
);

routes.post(
  "/categories",
  CreateCategoryDto.validators(),
  validator,
  (request: Request, response: Response, next: NextFunction) => {
    categoryController.create(request, response).catch((error: Error) => {
      next(error);
    });
  }
);

routes.get(
  "/categories/:id",
  (request: Request, response: Response, next: NextFunction) => {
    categoryController.show(request, response).catch((error: Error) => {
      next(error);
    });
  }
);

routes.put(
  "/categories/:id",
  UpdateCategoryDto.validators(),
  validator,
  (request: Request, response: Response, next: NextFunction) => {
    categoryController.update(request, response).catch((error: Error) => {
      next(error);
    });
  }
);

routes.delete(
  "/categories/:id",
  (request: Request, response: Response, next: NextFunction) => {
    categoryController.delete(request, response).catch((error: Error) => {
      next(error);
    });
  }
);

routes.post(
  "/courses",
  multer(multerConfig).single("image"),
  CreateCourseDto.validators(),
  validator,
  (request: Request, response: Response, next: NextFunction) => {
    courseController.create(request, response).catch((error: Error) => {
      next(error);
    });
  }
);

routes.get(
  "/courses",
  (request: Request, response: Response, next: NextFunction) => {
    courseController.getAll(request, response).catch((error: Error) => {
      next(error);
    });
  }
);

routes.get(
  "/courses/:id",
  (request: Request, response: Response, next: NextFunction) => {
    courseController.show(request, response).catch((error: Error) => {
      next(error);
    });
  }
);

routes.put(
  "/courses/:id",
  multer(multerConfig).single("image"),
  UpdateCourseDto.validators(),
  validator,
  (request: Request, response: Response, next: NextFunction) => {
    courseController.update(request, response).catch((error: Error) => {
      next(error);
    });
  }
);

export { routes };
