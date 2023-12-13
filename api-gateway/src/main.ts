import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useLogger(app.get(Logger));
  const config = new DocumentBuilder()
    .setTitle('api-gateway example')
    .setDescription('you can test api-gate with swagger')
    .setVersion('1.0')
    .addTag('api-gateway')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT,()=>{
    console.log("-------------------------------")
    console.log("-------------------------------", process.env.GRPC_URL)
    console.log("-------------------------------")
  });
}

bootstrap();
