import { Project } from "src/projects/entities/project.entity";
import { Stage } from "src/stages/entities/stage.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, OneToOne } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    title: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({ nullable: true })
    deadline: Date | null

    @ManyToMany(() => User, (user) => user.tasks)
    responsible: User[];

    @ManyToOne(() => User, (user) => user.tasks)
    reporter: User

    @ManyToOne(() => Project, (project) => project.id)
    @JoinColumn({ name: 'project' })
    project: Project;

    @ManyToOne(() => Stage, (stage) => stage.tasks)
    stage: Stage

    @Column()
    index: number
}
