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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const roles_enum_1 = require("../users/enum/roles.enum");
const JWT = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const process = require("process");
const typeorm_2 = require("@nestjs/typeorm");
const auth_entity_1 = require("./entities/auth.entity");
const nestjs_grpc_exceptions_1 = require("nestjs-grpc-exceptions");
let AuthService = class AuthService {
    constructor(userRepository, authRepository) {
        this.userRepository = userRepository;
        this.authRepository = authRepository;
    }
    async signUp(name, email, password, age) {
        const user = await this.userRepository.findOneBy({ email });
        if (user)
            throw new nestjs_grpc_exceptions_1.GrpcAlreadyExistsException("already exist!");
        const hashedPassword = await bcrypt.hash(password, 10);
        const userModel = {
            name,
            email,
            age,
            password: hashedPassword,
            type: roles_enum_1.type.USER
        };
        const result = await this.userRepository.save(userModel);
        const token = await this.generateToken(email, userModel.type, result.id);
        await this.authRepository.save({ token, email });
        return token;
    }
    async signIn(email, password) {
        const user = await this.userRepository.findOneBy({ email });
        if (!user)
            throw new nestjs_grpc_exceptions_1.GrpcNotFoundException("user not found!");
        const isUserValid = await bcrypt.compare(password, user.password);
        if (!isUserValid)
            throw new nestjs_grpc_exceptions_1.GrpcUnauthenticatedException("Invalid Credential");
        const token = await this.generateToken(email, user.type, user.id);
        await this.authRepository
            .createQueryBuilder()
            .update(auth_entity_1.Auth)
            .set({ token })
            .where("email = :email", { email })
            .execute();
        return token;
    }
    async generateToken(email, type, id) {
        return JWT.sign({
            email,
            type,
            id
        }, process.env.TOKEN_KEY, {
            expiresIn: 7 * 3600 * 24
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(auth_entity_1.Auth)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map