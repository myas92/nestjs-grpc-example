import { type } from '../enum/roles.enum';
export declare class User {
    id: number;
    name: string;
    password: string;
    email: string;
    age: number;
    type: type;
}
