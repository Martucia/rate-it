import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity()
export class Invitation {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Project, (project) => project.invitations)
    @JoinColumn()
    project: Project

    @Column({ unique: true })
    token: string

    @Column({ default: "sended" })
    status: string

    @Column()
    email: string
}