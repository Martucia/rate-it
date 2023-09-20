import { Stage } from "src/stages/entities/stage.entity";
import { Task } from "src/tasks/entities/task.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    name: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Task, (task) => task.project)
    @JoinTable()
    tasks: Task[]

    @ManyToMany(() => User, (user) => user.projects)
    @JoinTable()
    participants: User[]

    @OneToMany(() => Stage, (stage) => stage.project, { onDelete: 'CASCADE' })
    @JoinTable()
    stages: Stage[]
}
