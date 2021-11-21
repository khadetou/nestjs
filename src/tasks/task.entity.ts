import { TaskStatus } from "./task-status-enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    //If we didn't use uuid we would have postgresql specific id starting from 1 and so on and it would be of type number
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: TaskStatus;
}
