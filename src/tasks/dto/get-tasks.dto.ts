import { TaskStatus } from "../tasks.model";

export class GetTasksFilterDto {
    readonly status?: TaskStatus;
    readonly search?: string;
    readonly page?: number;
    readonly limit?: number;
}