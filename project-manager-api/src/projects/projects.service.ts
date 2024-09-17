import { Injectable, NotFoundException, Query } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "./entities/projects.entity";
import { Repository } from "typeorm";
import { PageService } from "src/modules/pagination/page/page.service";
import { DEFAULT_PAGE_SIZE, FilterDto } from "src/modules/pagination/dto/filter.dto";
import { UsersService } from "src/users/users.service";


@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        private readonly pageService: PageService,
        private readonly usersService: UsersService,
    ) { }
    
    async create(userEmail: string, createProjectDto: CreateProjectDto) {
        const user = await this.usersService.findOneByOrFail({
            email: userEmail,
        });
        return this.projectRepository.save({
            ...createProjectDto,
            user,
        });
    }

    async findAll(userEmail: string) {
        const user = await this.usersService.findOneBy({ email: userEmail });
        return this.projectRepository.find({ where: { user } });
    }

    async findAllPaginated(userEmail: string, filter?: FilterDto) {
        if (!filter) {
            return this.findAll(userEmail);
        }
        const user = await this.usersService.findOneBy({ email: userEmail });
        return this.pageService.paginate(
            this.projectRepository,
            {
                page: filter.page,
                pageSize: DEFAULT_PAGE_SIZE,
            },
            { user },
        );
    }

    async findOne(userEmail: string, id: number) {
        const user = await this.usersService.findOneBy({ email: userEmail });
        return this.projectRepository.findOne({
            where: { id, user },
            relations: { tasks: true },
        });
    }

    async update(
        userEmail: string,
        id: number,
        updateProjectDto: UpdateProjectDto,
    ) {
        const user = await this.usersService.findOneBy({ email: userEmail });
        const project = this.findOne(user.email, id);
        if (!project) {
            throw new NotFoundException();
        }
        return this.projectRepository.update(id, updateProjectDto);
    }

    async remove(id: number) {
        await this.projectRepository.softDelete(id);
    }
}
