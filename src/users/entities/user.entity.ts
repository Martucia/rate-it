import { Participant } from "src/projects/entities/participant.entity";
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

    @Column({ default: 'user.png' })
    avatar: string

    @Column({ select: false })
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Participant, (participant) => participant.user)
    participants: Participant[]

    // @ManyToMany(() => Project, (project) => project.participants)
    // @JoinTable()
    // projects: Project[] //  & { notification: unknown }

    @ManyToMany(() => Task, (task) => task.responsible)
    @JoinTable()
    tasks: Task[] //& { ownStage: number }
}

// import { Participant } from "src/projects/entities/participant.entity";
// import { Task } from "src/tasks/entities/task.entity";
// import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import { OwnTask } from "./owntask.entity";
// import { Stage } from "src/stages/entities/stage.entity";

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     email: string

//     @Column()
//     firstName: string

//     @Column()
//     lastName: string

//     @Column({ default: 'user.png' })
//     avatar: string

//     @Column({ select: false })
//     password: string

//     @CreateDateColumn()
//     createdAt: Date

//     @UpdateDateColumn()
//     updatedAt: Date

//     @OneToMany(() => Participant, (participant) => participant.user)
//     participants: Participant[]

//     @ManyToMany(() => OwnTask, (owntask) => owntask.user)
//     @JoinTable()
//     tasks: OwnTask[]

//     @OneToMany(() => Stage, (stage) => stage.user, { onDelete: 'CASCADE' })
//     stages: Stage[]
// }



