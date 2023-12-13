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
var UsersController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const nestjs_grpc_exceptions_1 = require("nestjs-grpc-exceptions");
const nestjs_pino_1 = require("nestjs-pino");
let UsersController = UsersController_1 = class UsersController {
    constructor(client, logger) {
        this.client = client;
        this.logger = logger;
        logger.setContext(UsersController_1.name);
    }
    onModuleInit() {
        this.userService = this.client.getService("UserService");
    }
    create(createUserDto, token) {
        this.logger.info("AuthController ==> create");
        return this.userService.create({ ...createUserDto, token });
    }
    findAll(token) {
        this.logger.info("AuthController ==> findAll");
        return this.userService.findAll({ token });
    }
    findOne(id, token) {
        this.logger.info("AuthController ==> findOne");
        return this.userService.findOne({ id: +id, token });
    }
    update(id, updateUserDto, token) {
        this.logger.info("AuthController ==> update");
        const updateModel = {
            name: updateUserDto.name,
            age: updateUserDto.age,
            id: +id,
            token: token
        };
        return this.userService.update(updateModel);
    }
    remove(id, token) {
        this.logger.info("AuthController ==> remove");
        return this.userService.remove({ id: +id, token });
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)(nestjs_grpc_exceptions_1.GrpcToHttpInterceptor),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(nestjs_grpc_exceptions_1.GrpcToHttpInterceptor),
    __param(0, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.UseInterceptors)(nestjs_grpc_exceptions_1.GrpcToHttpInterceptor),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseInterceptors)(nestjs_grpc_exceptions_1.GrpcToHttpInterceptor),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseInterceptors)(nestjs_grpc_exceptions_1.GrpcToHttpInterceptor),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = UsersController_1 = __decorate([
    (0, common_1.Controller)("users"),
    __param(0, (0, common_1.Inject)("TRANSFERPROTO_PACKAGE")),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.PinoLogger])
], UsersController);
//# sourceMappingURL=users.controller.js.map