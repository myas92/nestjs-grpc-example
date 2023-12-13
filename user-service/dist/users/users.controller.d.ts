import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { GetUserDto } from "./dto/get-user.dto";
import { RemoveUserDto } from "./dto/remove-user.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        msg: string;
    }>;
    findAll(): Promise<{
        users: import("./entities/user.entity").User[];
    }>;
    findOne(getUserDto: GetUserDto): Promise<import("./entities/user.entity").User>;
    update(updateUserDto: UpdateUserDto): Promise<{
        msg: string;
    }>;
    remove(removeUserDto: RemoveUserDto): Promise<{
        msg: string;
    }>;
}
