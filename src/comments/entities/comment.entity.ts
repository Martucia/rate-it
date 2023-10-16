import { User } from "src/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Task } from "../../tasks/entities/task.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    text: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    user: User

    @ManyToOne(() => Task, (stage) => stage.comments, { onDelete: 'CASCADE' })
    task: Task

    @Column('text', { array: true, default: [] })
    files: string[]
}
