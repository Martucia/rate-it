import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Participant {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.participants)
    @JoinColumn()
    user: User

    @ManyToOne(() => Project, (project) => project.participants)
    project: Project

    @Column()
    role: "participant" | "owner" | "moderator"

    @Column()
    status: "sended" | "accepted" | "denied"
}