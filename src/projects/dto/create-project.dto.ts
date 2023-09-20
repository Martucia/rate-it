import { IsNotEmpty } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateProjectDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    participants: User[]
}
