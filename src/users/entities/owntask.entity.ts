import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Stage } from "src/stages/entities/stage.entity";

@Entity()
export class OwnTask {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn()
    user: User

    @OneToOne(() => Task, (task) => task.id)
    task: Task

    @ManyToOne(() => Stage, (stage) => stage.tasks)
    stage: Stage
}