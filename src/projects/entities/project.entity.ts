
import { Stage } from "src/stages/entities/stage.entity";
import { Task } from "src/tasks/entities/task.entity";
// import { User } from "src/users/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Participant } from "./participant.entity";
import { Tag } from "src/tags/entities/tag.entity";

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

    @OneToMany(() => Task, (task) => task.project, { onDelete: 'CASCADE' })
    @JoinTable()
    tasks: Task[]

    @OneToMany(() => Participant, (participant) => participant.project, { onDelete: 'CASCADE' })
    participants: Participant[]
    
    @OneToMany(() => Stage, (stage) => stage.project, { onDelete: 'CASCADE' })
    // @JoinTable()
    stages: Stage[]

    @OneToMany(() => Tag, (tag) => tag.project, { onDelete: 'CASCADE' })
    tags: Tag[]
}
