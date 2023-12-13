"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const get_user_dto_1 = require("./dto/get-user.dto");
const microservices_1 = require("@nestjs/microservices");
const remove_user_dto_1 = require("./dto/remove-user.dto");
const nestjs_grpc_exceptions_1 = require("nestjs-grpc-exceptions");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        const name = createUserDto?.name;
        const email = createUserDto?.email;
        const password = createUserDto?.password;
        const age = +createUserDto?.age;
        let serviceResult = await this.usersService.create(name, email, password, age);
        return { msg: `user ${serviceResult.name} added` };
    }
    async findAll() {
        let serviceResult = await this.usersService.findAll();
        return { users: serviceResult };
    }
    async findOne(getUserDto) {
        let id = +getUserDto?.id;
        let serviceResult = await this.usersService.findOne(id);
        if (serviceResult)
            return serviceResult;
        throw new nestjs_grpc_exceptions_1.GrpcNotFoundException("user not found.");
    }
    async update(updateUserDto) {
        console.log(updateUserDto);
        const id = +updateUserDto?.id;
        const name = updateUserDto?.name;
        const age = +updateUserDto?.age;
        let serviceResult = await this.usersService.update(id, name, age);
        console.log("======-----========");
        console.log(serviceResult.affected);
        console.log("======-----========");
        if (serviceResult.affected)
            return { msg: `user ${name} edited` };
        throw new nestjs_grpc_exceptions_1.GrpcNotFoundException("user not found.");
    }
    async remove(removeUserDto) {
        let id = +removeUserDto?.id;
        let serviceResult = await this.usersService.remove(id);
        console.log("======-----========");
        console.log(serviceResult.affected);
        console.log("======-----========");
        if (serviceResult.affected)
            return { msg: `user ${id} deleted` };
        throw new nestjs_grpc_exceptions_1.GrpcNotFoundException("user not found.");
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, microservices_1.GrpcMethod)("UserService", "create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, microservices_1.GrpcMethod)("UserService", "findAll"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.GrpcMethod)("UserService", "findOne"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_user_dto_1.GetUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.GrpcMethod)("UserService", "update"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, microservices_1.GrpcMethod)("UserService", "remove"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_user_dto_1.RemoveUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map