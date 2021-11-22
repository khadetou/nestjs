import { UpdateTaskStatusDto } from './upadate-task-status.dto';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';



@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {}
    
    // @Get()
    // getTasks(@Query() filterDto:GetTasksFilterDto): Task[] {
    //     //If we have any filter
    //     if(Object.keys(filterDto).length){
    //         return this.tasksService.getTasksWithFilters(filterDto);
    //     }else{
    //         return this.tasksService.getAllTasks();
    //     }
    // }

    @Get("/:id")
    getTaskById(@Param('id') id: string): Promise<Task> {
        return  this.tasksService.getTaskById(id);

    }
    // @Get('/:id')
    // getTaskById(@Param('id') id: string) {
    //     return this.tasksService.getTaskById(id);
    // }


    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }
    

    // @Post()
    // createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //     return this.tasksService.createTask(createTaskDto);
    // }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string,@Body() updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> { 
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status);
    }

    // @Patch('/:id/status')
    // updateTaskStatus(@Param('id') id: string,@Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
    //     const {status} = updateTaskStatusDto;
    //     return this.tasksService.updateTaskStatus(id, status);
    // }
    
    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(id);
    }
    // @Delete('/:id')
    // deleteTask(@Param('id') id: string) {
    //     this.tasksService.deleteTask(id);
    // }
    

    //Old way to do it
    // @Post()
    // createTask(@Body("title") title: string, @Body("description") description: string): Task {
    //     return this.tasksService.createTask(title, description);
    // }
}
