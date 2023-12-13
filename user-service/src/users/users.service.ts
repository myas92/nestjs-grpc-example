import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import { type } from "./enum/roles.enum";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { GrpcAlreadyExistsException, GrpcInternalException } from "nestjs-grpc-exceptions";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
  }

  async create(name: string, email: string, password: string, age: number) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user: User = new User();
      user.name = name;
      user.age = age;
      user.email = email;
      user.password = hashedPassword;
      user.type = type.USER;
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === "23505") throw new GrpcAlreadyExistsException("email must be unique.");
      console.error(error);
      throw new GrpcInternalException("internal exception.");
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.error(error);
      throw new GrpcInternalException("internal exception.");
    }
  }

  async findOne(id: number) {
    try {
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      console.error(error);
      throw new GrpcInternalException("internal exception.");
    }
  }

  async update(id: number, name: string, age: number) {
    try {
      return await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ name, age })
        .where("id = :id", { id })
        .execute();
    } catch (error) {
      console.error(error);
      throw new GrpcInternalException("internal exception.");
    }
  }

  async remove(id: number) {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw new GrpcInternalException("internal exception.");
    }
  }
}
