import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 400 })
  token: string;

  @Column({ unique: true })
  @Column({ type: 'varchar', length: 40 })
  email: string;
}
