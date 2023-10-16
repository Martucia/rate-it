import { IsNotEmpty, IsOptional } from "class-validator";
import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";

export class CreateStageDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    color: string

    @IsNotEmpty()
    background: string

    @IsNotEmpty()
    project: Project


    // @IsNotEmpty()
    // index: number
}
