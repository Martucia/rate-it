import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
// import { User } from "src/users/entities/user.entity";

export class CreateProjectDto {
    @IsNotEmpty()
    name: string
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
