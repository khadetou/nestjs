import { TaskStatus } from './tasks.model';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn("uuid")
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: TaskStatus;
}
