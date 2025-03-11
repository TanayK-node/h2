import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type RoomStatus = 'available' | 'occupied' | 'under-maintenance';

@Entity()
export class ExamRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  roomNumber: string;

  @Column('int')
  capacity: number;

  @Column()
  floor: string;

  @Column()
  building: string;

  @Column({
    type: 'enum',
    enum: ['available', 'occupied', 'under-maintenance'],
    default: 'available'
  })
  status: RoomStatus;
}