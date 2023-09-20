import { Project } from "src/projects/entities/project.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToMany(() => Project, (project) => project.participants)
    @JoinTable()
    projects: Project & { notification: unknown }[]

    @ManyToMany(() => Task, (task) => task.responsible)
    @JoinTable()
    tasks: Task & { ownStage: number }[];
}

