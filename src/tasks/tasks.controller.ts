import { GetTasksFilterDto } from './dto/get-tasks.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Task } from './tasks.model';


@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {}
    
    @Get()
    getTasks(@Query() filterDto:GetTasksFilterDto): Task[] {
        //If we have any filter
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        }else{
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string) {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Patch('/:id')
    updateTaskStatus(@Param('id') id: string,@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.updateTaskStatus(id, createTaskDto);
    }
    

    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        this.tasksService.deleteTask(id);
    }
    

    //Old way to do it
    // @Post()
    // createTask(@Body("title") title: string, @Body("description") description: string): Task {
    //     return this.tasksService.createTask(title, description);
    // }
}
