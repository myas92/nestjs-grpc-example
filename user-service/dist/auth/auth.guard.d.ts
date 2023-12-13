import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Auth } from "./entities/auth.entity";
import { Repository } from "typeorm";
export declare class AuthGuard implements CanActivate {
    private reflector;
    private readonly authRepository;
    constructor(reflector: Reflector, authRepository: Repository<Auth>);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private getTokenFromDB;
}
