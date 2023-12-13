import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "TRANSFERPROTO_PACKAGE",
        transport: Transport.GRPC,
        options: {
          url: `192.168.64.4:50052`,
          package: "transferproto",
          protoPath: join(__dirname, "../proto/transfer.proto")
        }
      }
    ])
  ],
  controllers: [UsersController],
  providers: []
})
export class UsersModule {
}
