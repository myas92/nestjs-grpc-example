import { OnModuleInit } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { PinoLogger } from "nestjs-pino";
export declare class UsersController implements OnModuleInit {
    private client;
    private readonly logger;
    private userService;
    constructor(client: ClientGrpc, logger: PinoLogger);
    onModuleInit(): void;
    create(createUserDto: CreateUserDto, token: string): Observable<any>;
    findAll(token: string): Observable<any>;
    findOne(id: string, token: string): Observable<any>;
    update(id: string, updateUserDto: UpdateUserDto, token: string): Observable<any>;
    remove(id: string, token: string): Observable<any>;
}
