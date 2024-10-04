import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { Letters } from './letters.model';
import { Users } from '../users/users.model';

@Table
export class LettersToUser extends Model<LettersToUser> {
    @ForeignKey(() => Letters)
    @Column({ type: DataType.STRING })
    lettersId: string;

    @ForeignKey(() => Users)
    @Column({ type: DataType.STRING })
    userId: string;

    
}