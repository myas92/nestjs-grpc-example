import {
  CanActivate,
  ExecutionContext,
  Injectable
} from "@nestjs/common";
import * as JWT from "jsonwebtoken";
import * as process from "process";
import { IS_PUBLIC_KEY } from "./decorators/public.decorator";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "./entities/auth.entity";
import { Repository } from "typeorm";
import { GrpcInternalException, GrpcUnauthenticatedException } from "nestjs-grpc-exceptions";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (isPublic) {
      return true;
    }

    const token = context.switchToHttp().getRequest()?.token;

    console.log("=======token=======");
    console.log(token);
    console.log("=======token=======");


    try {
      if (!token)
        throw new Error("token does not exist");

      const payload: any = JWT.verify(token, process.env.TOKEN_KEY);
      console.log("=======payload=======");
      console.log(payload);
      console.log("=======payload=======");

      const oldToken = await this.getTokenFromDB(payload?.email);

      if (oldToken !== token)
        throw new Error("expired token");

    } catch (error) {
      if (error.message === "token does not exist")
        throw new GrpcUnauthenticatedException("token does not exist, please login first!");

      if (error.message === "expired token")
        throw new GrpcUnauthenticatedException("expired token, please send new token!");

      if (error.message === "invalid signature")
        throw new GrpcUnauthenticatedException("invalid token, please correct your token!");

      console.error(error);
      throw new GrpcInternalException("internal exception.");
    }
    return true;
  }

  private async getTokenFromDB(email: string): Promise<string> {
    const user = await this.authRepository.findOneBy({ email });
    console.log("=======user=======");
    console.log(user);
    console.log("=======user=======");
    return user?.token;
  }
}
