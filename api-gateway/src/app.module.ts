import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { LoggerModule } from "nestjs-pino";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        transport: { target: "pino-pretty" },
        msgPrefix: "===> "
      }
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
