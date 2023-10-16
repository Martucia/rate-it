import { IsNotEmpty, IsOptional } from "class-validator";

// export class CreateCommentDto {
//     @IsNotEmpty()
//     text: string

//     @IsNotEmpty()
//     task: {
//         id: number
//     }

//     @IsOptional()
//     files?: string[]
// }


// export class CreateCommentDto {
//     comment: {
//         text: string

//         task: {
//             id: number
//         }
//     }

//     files?: string[]
// }

export class CreateCommentDto {
    comment: string

    // comment: {
    //     text: string,
    //     task: {
    //         id: number
    //     }
    // }

    files?: string[]
}