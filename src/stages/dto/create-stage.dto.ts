import { IsNotEmpty } from "class-validator";
import { Project } from "src/projects/entities/project.entity";

export class CreateStageDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    color: string

    @IsNotEmpty()
    background: string

    @IsNotEmpty()
    projectId: number

    @IsNotEmpty()
    index: number
}
