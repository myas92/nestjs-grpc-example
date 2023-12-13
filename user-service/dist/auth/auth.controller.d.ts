import { SignUpAuthDto } from "./dto/signUp-auth.dto";
import { SignInAuthDto } from "./dto/signIn-auth.dto";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDTO: SignUpAuthDto): Promise<{
        msg: any;
    }>;
    signIn(signInDTO: SignInAuthDto): Promise<{
        msg: any;
    }>;
}
