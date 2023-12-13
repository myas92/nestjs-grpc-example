import { Body, Controller } from "@nestjs/common";
import { SignUpAuthDto } from "./dto/signUp-auth.dto";
import { SignInAuthDto } from "./dto/signIn-auth.dto";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { GrpcMethod } from "@nestjs/microservices";


@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Public()
  @GrpcMethod("AuthService", "signUp")
  async signUp(@Body() signUpDTO: SignUpAuthDto) {
    const name = signUpDTO?.name;
    const email = signUpDTO?.email;
    const password = signUpDTO?.password;
    const age = +signUpDTO?.age;
    let serviceResult = await this.authService.signUp(name, email, password, age);
    return { msg: serviceResult };
  }

  @Public()
  @GrpcMethod("AuthService", "signIn")
  async signIn(@Body() signInDTO: SignInAuthDto) {
    const email = signInDTO?.email;
    const password = signInDTO?.password;
    let serviceResult = await this.authService.signIn(email, password);
    return { msg: serviceResult };
  }
}
