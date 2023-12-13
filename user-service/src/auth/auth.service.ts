import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { type } from "../users/enum/roles.enum";
import * as JWT from "jsonwebtoken";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import * as process from "process";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "./entities/auth.entity";
import {
  GrpcAlreadyExistsException,
  GrpcNotFoundException,
  GrpcUnauthenticatedException
} from "nestjs-grpc-exceptions";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>
  ) {
  }

  async signUp(name: string, email: string, password: string, age: number) {

    const user = await this.userRepository.findOneBy({ email });
    if (user) throw new GrpcAlreadyExistsException("already exist!");
    const hashedPassword = await bcrypt.hash(password, 10);
    const userModel = {
      name,
      email,
      age,
      password: hashedPassword,
      type: type.USER
    };
    const result = await this.userRepository.save(userModel);
    const token = await this.generateToken(email, userModel.type, result.id);
    await this.authRepository.save({ token, email });
    return token;
  }

  async signIn(email: string, password: string) {

    const user = await this.userRepository.findOneBy({ email });
    if (!user)
      throw new GrpcNotFoundException("user not found!");
    const isUserValid = await bcrypt.compare(password, user.password);
    if (!isUserValid)
      throw new GrpcUnauthenticatedException("Invalid Credential");

    const token = await this.generateToken(email, user.type, user.id);
    await this.authRepository
      .createQueryBuilder()
      .update(Auth)
      .set({ token })
      .where("email = :email", { email })
      .execute();
    return token;
  }

  async generateToken(email: string, type: string, id: number) {
    return JWT.sign(
      {
        email,
        type,
        id
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: 7 * 3600 * 24
      }
    );
  }
}
