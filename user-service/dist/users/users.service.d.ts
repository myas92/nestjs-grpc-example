import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(name: string, email: string, password: string, age: number): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, name: string, age: number): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
