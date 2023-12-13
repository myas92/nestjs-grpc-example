"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: "TRANSFERPROTO_PACKAGE",
                    transport: microservices_1.Transport.GRPC,
                    options: {
                        url: "0.0.0.0:50052",
                        package: "transferproto",
                        protoPath: (0, path_1.join)(__dirname, "../proto/transfer.proto")
                    }
                }
            ])
        ],
        controllers: [auth_controller_1.AuthController],
        providers: []
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map