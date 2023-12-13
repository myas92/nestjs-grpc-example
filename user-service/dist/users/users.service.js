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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const roles_enum_1 = require("./enum/roles.enum");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const nestjs_grpc_exceptions_1 = require("nestjs-grpc-exceptions");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(name, email, password, age) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new user_entity_1.User();
            user.name = name;
            user.age = age;
            user.email = email;
            user.password = hashedPassword;
            user.type = roles_enum_1.type.USER;
            return await this.userRepository.save(user);
        }
        catch (error) {
            if (error.code === "23505")
                throw new nestjs_grpc_exceptions_1.GrpcAlreadyExistsException("email must be unique.");
            console.error(error);
            throw new nestjs_grpc_exceptions_1.GrpcInternalException("internal exception.");
        }
    }
    async findAll() {
        try {
            return await this.userRepository.find();
        }
        catch (error) {
            console.error(error);
            throw new nestjs_grpc_exceptions_1.GrpcInternalException("internal exception.");
        }
    }
    async findOne(id) {
        try {
            return await this.userRepository.findOneBy({ id });
        }
        catch (error) {
            console.error(error);
            throw new nestjs_grpc_exceptions_1.GrpcInternalException("internal exception.");
        }
    }
    async update(id, name, age) {
        try {
            return await this.userRepository
                .createQueryBuilder()
                .update(user_entity_1.User)
                .set({ name, age })
                .where("id = :id", { id })
                .execute();
        }
        catch (error) {
            console.error(error);
            throw new nestjs_grpc_exceptions_1.GrpcInternalException("internal exception.");
        }
    }
    async remove(id) {
        try {
            return await this.userRepository.delete(id);
        }
        catch (error) {
            console.error(error);
            throw new nestjs_grpc_exceptions_1.GrpcInternalException("internal exception.");
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map