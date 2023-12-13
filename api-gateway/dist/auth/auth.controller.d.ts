import { OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { SignUpAuthDto } from "./dto/signUp-auth.dto";
import { SignInAuthDto } from "./dto/signIn-auth.dto";
import { PinoLogger } from "nestjs-pino";
export declare class AuthController implements OnModuleInit {
    private client;
    private readonly logger;
    private authService;
    constructor(client: ClientGrpc, logger: PinoLogger);
    onModuleInit(): void;
    signUp(signUpAuthDto: SignUpAuthDto): Observable<any>;
    signIn(signInAuthDto: SignInAuthDto): Observable<any>;
}
