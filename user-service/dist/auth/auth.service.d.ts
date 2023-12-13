import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { Auth } from "./entities/auth.entity";
export declare class AuthService {
    private readonly userRepository;
    private readonly authRepository;
    constructor(userRepository: Repository<User>, authRepository: Repository<Auth>);
    signUp(name: string, email: string, password: string, age: number): Promise<any>;
    signIn(email: string, password: string): Promise<any>;
    generateToken(email: string, type: string, id: number): Promise<any>;
}
