import { IsNotEmpty } from "class-validator";

export class CreateTagDto {
    @IsNotEmpty()
    color: string

    @IsNotEmpty()
    background: string

    @IsNotEmpty()
    label: string

    @IsNotEmpty()
    project: {
        id: number
    }
}
