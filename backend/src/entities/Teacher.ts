import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  department: string;

  @Column('simple-array')
  subjects: string[];

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  joinDate: Date;
}