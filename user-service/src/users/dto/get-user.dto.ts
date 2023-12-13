import {IsInt } from "class-validator";

export class GetUserDto {

  @IsInt()
  id: number;
}
