import { GetTasksFilterDto } from './dto/get-tasks.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filteDto: GetTasksFilterDto): Task[] {
        const {status, search} = filteDto;
        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter(task => task.status === status);
        }

        if(search){
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }

        return tasks;

    }
    
    getTaskById(id: string): Task {

       const task = this.tasks.find(task => task.id === id);
     
       if(!task){
           throw new NotFoundException( `Task with id ${id} not found`);
       }
         return task;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };
        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto;
        const task = this.getTaskById(id);
        task.title = title;
        task.description = description;
        return task;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}
