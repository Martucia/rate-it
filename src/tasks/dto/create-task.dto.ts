import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { IsDate, IsNotEmpty, IsOptional, ValidateIf } from "class-validator";
import { Stage } from "src/stages/entities/stage.entity";

export class CreateTaskDto {
    @IsNotEmpty()
    title: string

    @IsOptional()
    deadline: Date | null

    @IsOptional()
    responsible: User[] | null

    @IsOptional()
    reporter: User

    @IsNotEmpty()
    project: Project

    @IsNotEmpty()
    stage: Stage

    @IsOptional()
    index?: number
}
