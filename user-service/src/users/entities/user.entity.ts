import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { type } from '../enum/roles.enum';

@Entity()
export class User {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ unique: true })
  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'text' })
  type: type;
}
