import { Project } from "src/projects/entities/project.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    color: string

    @Column()
    background: string

    @Column()
    label: string

    @ManyToOne(() => Project, (project) => project.tags)
    project: Project

    @ManyToMany(() => Task, (task) => task.tags)
    @JoinTable()
    tasks: Task[]
}
