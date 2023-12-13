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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const JWT = require("jsonwebtoken");
const process = require("process");
const public_decorator_1 = require("./decorators/public.decorator");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const auth_entity_1 = require("./entities/auth.entity");
const typeorm_2 = require("typeorm");
const nestjs_grpc_exceptions_1 = require("nestjs-grpc-exceptions");
let AuthGuard = class AuthGuard {
    constructor(reflector, authRepository) {
        this.reflector = reflector;
        this.authRepository = authRepository;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
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
            const payload = JWT.verify(token, process.env.TOKEN_KEY);
            console.log("=======payload=======");
            console.log(payload);
            console.log("=======payload=======");
            const oldToken = await this.getTokenFromDB(payload?.email);
            if (oldToken !== token)
                throw new Error("expired token");
        }
        catch (error) {
            if (error.message === "token does not exist")
                throw new nestjs_grpc_exceptions_1.GrpcUnauthenticatedException("token does not exist, please login first!");
            if (error.message === "expired token")
                throw new nestjs_grpc_exceptions_1.GrpcUnauthenticatedException("expired token, please send new token!");
            if (error.message === "invalid signature")
                throw new nestjs_grpc_exceptions_1.GrpcUnauthenticatedException("invalid token, please correct your token!");
            console.error(error);
            throw new nestjs_grpc_exceptions_1.GrpcInternalException("internal exception.");
        }
        return true;
    }
    async getTokenFromDB(email) {
        const user = await this.authRepository.findOneBy({ email });
        console.log("=======user=======");
        console.log(user);
        console.log("=======user=======");
        return user?.token;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(auth_entity_1.Auth)),
    __metadata("design:paramtypes", [core_1.Reflector,
        typeorm_2.Repository])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map