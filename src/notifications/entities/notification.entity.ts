import { OwnTask } from "src/users/entities/owntask.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text" })
    text: string

    @Column({ type: "text" })
    type: string

    @ManyToOne(() => OwnTask, (owntask) => owntask.task)
    @JoinColumn()
    task: OwnTask
}
