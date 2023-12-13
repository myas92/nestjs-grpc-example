import { IsInt, IsString } from "class-validator";

export class UpdateUserDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsInt()
  age: number;
}
