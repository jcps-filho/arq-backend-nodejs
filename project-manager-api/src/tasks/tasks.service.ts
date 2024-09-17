import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "src/projects/entities/projects.entity";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,

    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(userEmail: string, createTaskDto: CreateTaskDto) {
    const user = await this.usersRepository.findOneByOrFail({
      email: userEmail,
    });
    const project = await this.projectsRepository.findOneByOrFail({
      id: createTaskDto.projectId,
      user,
    });
    return this.tasksRepository.save({
      ...createTaskDto,
      project,
      user,
    });
  }

  async findAll(userEmail: string) {
    const user = await this.usersRepository.findOneByOrFail({
      email: userEmail,
    });
    return this.tasksRepository.find({
      relations: ["project"],
      where: { user },
    });
  }

  async findOne(userEmail: string, id: number) {
    const user = await this.usersRepository.findOneByOrFail({
      email: userEmail,
    });
    return this.tasksRepository.find({
      where: { id, user },
      relations: ["project"],
    });
  }

  async update(userEmail: string, id: number, updateTaskDto: UpdateTaskDto) {
    const user = await this.usersRepository.findOneByOrFail({
      email: userEmail,
    });
    const task = this.tasksRepository.findOneByOrFail({ id, user });
    if (!task) {
      throw new UnauthorizedException();
    }
    return this.tasksRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.tasksRepository.softDelete(id);
  }

}
