import { Transform } from "class-transformer";
import { Project } from "src/projects/entities/project.entity";
import { Stage } from "src/stages/entities/stage.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, OneToOne, OneToMany } from "typeorm";
import { Comment } from "../../comments/entities/comment.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    index: number

    @Column({ type: 'text' })
    title: string

    @Column({ type: 'text', default: '' })
    description: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({ nullable: true })
    deadline: Date | null

    @ManyToMany(() => User, (user) => user.tasks)
    responsible: User[];

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    reporter: User

    @ManyToOne(() => Project, (project) => project.id)
    @JoinColumn({ name: 'project' })
    project: Project;

    @ManyToOne(() => Stage, (stage) => stage.tasks) // , { onDelete: 'CASCADE' }
    stage: Stage

    @OneToMany(() => Comment, (comment) => comment.task, { onDelete: 'CASCADE' })
    comments: Comment[]

    @OneToMany(() => Task, (task) => task.parentTask)
    childTasks: Task[]

    @ManyToOne(() => Task, (task) => task.childTasks)
    parentTask: Task

    @Column('text', { array: true, default: [] })
    files: string[]
}
