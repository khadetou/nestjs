import { ConfigModule, ConfigService } from '@nestjs/config';
import { UpdateTaskStatusDto } from './upadate-task-status.dto';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(
    private tasksService: TasksService,
    private configService: ConfigService,
  ) {
    console.log(configService.get('TEST_VALUE'));
  }

  @Get()
  getTasks(
    @Query() getTasksFilterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        getTasksFilterDto,
      )}`,
    );
    return this.tasksService.getTasks(getTasksFilterDto, user);
  }

  // @Get()
  // getTasks(@Query() filterDto:GetTasksFilterDto): Task[] {
  //     //If we have any filter
  //     if(Object.keys(filterDto).length){
  //         return this.tasksService.getTasksWithFilters(filterDto);
  //     }else{
  //         return this.tasksService.getAllTasks();
  //     }
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }
  // @Get('/:id')
  // getTaskById(@Param('id') id: string) {
  //     return this.tasksService.getTaskById(id);
  // }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(`User ${user.username}`);
    return this.tasksService.createTask(createTaskDto, user);
  }

  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //     return this.tasksService.createTask(createTaskDto);
  // }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  // @Patch('/:id/status')
  // updateTaskStatus(@Param('id') id: string,@Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
  //     const {status} = updateTaskStatusDto;
  //     return this.tasksService.updateTaskStatus(id, status);
  // }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
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
