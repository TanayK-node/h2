import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'class' })
  class: string;

  @Column({ unique: true })
  rollNumber: string;

  @Column('decimal')
  attendance: number;

  @Column('jsonb')
  performanceData: Array<{ subject: string; score: number }>;
}