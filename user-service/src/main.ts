import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

async function bootstrap() {
  console.log("*******************************************")
  console.log("*******************************************", process.env.DB_HOST)
  console.log("*******************************************", process.env.DB_USER)
  console.log("*******************************************")
  console.log("*******************************************")
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: "transferproto",
        protoPath: join(__dirname, "./proto/transfer.proto"),
        url: "0.0.0.0:50052"
      }
    }
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );
  await app.listen();
}

bootstrap();