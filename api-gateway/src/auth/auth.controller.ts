import {
  Controller,
  Post,
  Body,
  OnModuleInit,
  Inject, UseInterceptors
} from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { GrpcToHttpInterceptor } from "nestjs-grpc-exceptions";
import { SignUpAuthDto } from "./dto/signUp-auth.dto";
import { SignInAuthDto } from "./dto/signIn-auth.dto";
import { PinoLogger } from "nestjs-pino";


interface AuthService {
  signUp({}): Observable<any>;

  signIn({}): Observable<any>;
}


@Controller("auth")
export class AuthController implements OnModuleInit {
  private authService: AuthService;

  constructor(@Inject("TRANSFERPROTO_PACKAGE") private client: ClientGrpc, private readonly logger: PinoLogger) {
    logger.setContext(AuthController.name);
  }

  onModuleInit() {
    this.authService = this.client.getService<AuthService>("AuthService");
  }

  @Post("signUp")
  @UseInterceptors(GrpcToHttpInterceptor)
  signUp(@Body() signUpAuthDto: SignUpAuthDto) {
    this.logger.info("AuthController ==> signUp");
    return this.authService.signUp(signUpAuthDto);
  }

  @Post("signIn")
  @UseInterceptors(GrpcToHttpInterceptor)
  signIn(@Body() signInAuthDto: SignInAuthDto) {
    this.logger.info("AuthController ==> signIn");
    return this.authService.signIn(signInAuthDto);
  }

}
