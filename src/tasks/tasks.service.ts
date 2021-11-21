import { TaskStatus } from './task-status-enum';
import { TaskRespository } from './task.respository';
import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
   
    constructor(
    @InjectRepository(TaskRespository) 
    private taskRespository: TaskRespository
    ) {}



//     getAllTasks(): Task[] {
//         return this.tasks;
//     }

//     getTasksWithFilters(filteDto: GetTasksFilterDto): Task[] {
//         const {status, search} = filteDto;
//         let tasks = this.getAllTasks();

//         if(status){
//             tasks = tasks.filter(task => task.status === status);
//         }

//         if(search){
//             tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
//         }

//         return tasks;

//     }

        async getTaskById(id: string): Promise<Task> {
            const found = await this.taskRespository.findOne(id);
            console.log(found)
            if(!found){
                throw new NotFoundException(`Task with ID ${id} not found`);
            }
            return found;
        }

//     getTaskById(id: string): Task {

//        const task = this.tasks.find(task => task.id === id);
     
//        if(!task){
//            throw new NotFoundException( `Task with id ${id} not found`);
//        }
//          return task;
//     }

       createTask(createTaskDto: CreateTaskDto): Promise<Task> {
           return this.taskRespository.createTask(createTaskDto);
        }

//     createTask(createTaskDto: CreateTaskDto): Task {
//         const {title, description} = createTaskDto;
//         const task: Task = {
//             id: uuid(),
//             title,
//             description,
//             status: TaskStatus.OPEN
//         };
//         this.tasks.push(task);
//         return task;
//     }

//   updateTaskStatus(id: string, status: TaskStatus): Task {
//         const task = this.getTaskById(id);
//         task.status = status;
//         return task;
//     }

//     deleteTask(id: string): void {
//         const task = this.getTaskById(id);
        
//         this.tasks = this.tasks.filter(task => task.id !== id);
//     }
}
