import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { User } from "./users/entities/user.entity";
import { Auth } from "./auth/entities/auth.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      logging: true,
      entities: [ User, Auth],
      synchronize: true
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
