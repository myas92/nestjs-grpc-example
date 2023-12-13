"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useLogger(app.get(nestjs_pino_1.Logger));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('api-gateway example')
        .setDescription('you can test api-gate with swagger')
        .setVersion('1.0')
        .addTag('api-gateway')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT, () => {
        console.log("-------------------------------");
        console.log("-------------------------------");
        console.log("-------------------------------");
    });
}
bootstrap();
//# sourceMappingURL=main.js.map