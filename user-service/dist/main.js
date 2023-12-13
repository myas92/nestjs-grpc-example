"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
async function bootstrap() {
    console.log("*******************************************");
    console.log("*******************************************", process.env.DB_HOST);
    console.log("*******************************************", process.env.DB_USER);
    console.log("*******************************************");
    console.log("*******************************************");
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            package: "transferproto",
            protoPath: (0, path_1.join)(__dirname, "./proto/transfer.proto"),
            url: "0.0.0.0:50052"
        }
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true
        }
    }));
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map