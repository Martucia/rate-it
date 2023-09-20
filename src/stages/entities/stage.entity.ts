import { Project } from "src/projects/entities/project.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Stage {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    color: string

    @Column()
    background: string

    @Column()
    index: number

    @ManyToOne(() => Project, (project) => project.stages)
    project: Project

    @OneToMany(() => Task, (task) => task.stage, { onDelete: 'CASCADE' })
    tasks: Task[]
}
