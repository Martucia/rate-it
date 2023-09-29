import { Project } from "src/projects/entities/project.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Participant {
    @PrimaryGeneratedColumn()
    id: number

    // @OneToOne(() => User, (user) => user.id)
    // @JoinTable()
    // user: User

    @ManyToOne(() => User, (user) => user.participants)
    @JoinColumn()
    user: User
    
    // @JoinTable()
    // @Column()
    // userId: number

    @ManyToOne(() => Project, (project) => project.participants)
    // @JoinTable()
    project: Project

    @Column()
    role: "participant" | "owner" | "moderator"

    @Column()
    status: "sended" | "accepted" | "denied"
}