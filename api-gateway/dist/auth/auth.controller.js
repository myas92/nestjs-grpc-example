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
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_grpc_exceptions_1 = require("nestjs-grpc-exceptions");
const signUp_auth_dto_1 = require("./dto/signUp-auth.dto");
const signIn_auth_dto_1 = require("./dto/signIn-auth.dto");
const nestjs_pino_1 = require("nestjs-pino");
let AuthController = AuthController_1 = class AuthController {
    constructor(client, logger) {
        this.client = client;
        this.logger = logger;
        logger.setContext(AuthController_1.name);
    }
    onModuleInit() {
        this.authService = this.client.getService("AuthService");
    }
    signUp(signUpAuthDto) {
        this.logger.info("AuthController ==> signUp");
        return this.authService.signUp(signUpAuthDto);
    }
    signIn(signInAuthDto) {
        this.logger.info("AuthController ==> signIn");
        return this.authService.signIn(signInAuthDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("signUp"),
    (0, common_1.UseInterceptors)(nestjs_grpc_exceptions_1.GrpcToHttpInterceptor),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signUp_auth_dto_1.SignUpAuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)("signIn"),
    (0, common_1.UseInterceptors)(nestjs_grpc_exceptions_1.GrpcToHttpInterceptor),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signIn_auth_dto_1.SignInAuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
exports.AuthController = AuthController = AuthController_1 = __decorate([
    (0, common_1.Controller)("auth"),
    __param(0, (0, common_1.Inject)("TRANSFERPROTO_PACKAGE")),
    __metadata("design:paramtypes", [Object, nestjs_pino_1.PinoLogger])
], AuthController);
//# sourceMappingURL=auth.controller.js.map