import { Controller, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { GetUserDto } from "./dto/get-user.dto";
import { GrpcMethod, RpcException } from "@nestjs/microservices";
import { RemoveUserDto } from "./dto/remove-user.dto";
import { GrpcNotFoundException } from "nestjs-grpc-exceptions";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @GrpcMethod("UserService", "create")
  async create(@Body() createUserDto: CreateUserDto) {
    const name = createUserDto?.name;
    const email = createUserDto?.email;
    const password = createUserDto?.password;
    const age = +createUserDto?.age;
    let serviceResult = await this.usersService.create(name, email, password, age);
    return { msg: `user ${serviceResult.name} added` };


  }

  @GrpcMethod("UserService", "findAll")
  async findAll() {
    let serviceResult = await this.usersService.findAll();
    return { users: serviceResult };
  }

  @GrpcMethod("UserService", "findOne")
  async findOne(@Body() getUserDto: GetUserDto) {
    let id = +getUserDto?.id;
    let serviceResult = await this.usersService.findOne(id);
    if (serviceResult) return serviceResult;
    throw new GrpcNotFoundException("user not found.");

  }

  @GrpcMethod("UserService", "update")
  async update(@Body() updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    const id = +updateUserDto?.id;
    const name = updateUserDto?.name;
    const age = +updateUserDto?.age;
    let serviceResult = await this.usersService.update(id, name, age);
    console.log("======-----========");
    console.log(serviceResult.affected);
    console.log("======-----========");
    if (serviceResult.affected) return { msg: `user ${name} edited` };
    throw new GrpcNotFoundException("user not found.");
  }

  @GrpcMethod("UserService", "remove")
  async remove(@Body() removeUserDto: RemoveUserDto) {
    let id = +removeUserDto?.id;
    let serviceResult = await this.usersService.remove(id);
    console.log("======-----========");
    console.log(serviceResult.affected);
    console.log("======-----========");
    if (serviceResult.affected) return { msg: `user ${id} deleted` };
    throw new GrpcNotFoundException("user not found.");
  }
}
