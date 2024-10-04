import { Column, DataType, Model, BelongsToMany, Table } from "sequelize-typescript";
import { DataTypes } from 'sequelize'
import { Letters } from "../letters/letters.model";
import { LettersToUser } from '../letters/lettersToUser'

@Table({ tableName: 'users' })
export class Users extends Model<Users> {

    @Column({ type: DataTypes.STRING, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true })
    id: string;

    @Column({ type: DataType.STRING, unique: true })
    user_tg_id: string | number;

    @Column({ type: DataType.TEXT })
    user_name: string;

    @Column({ type: DataType.STRING })
    user_image: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    premium: boolean;

    @Column({ type: DataType.STRING, defaultValue: null })
    one_time_code: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    onebording: boolean

    @Column({ type: DataType.STRING, defaultValue: null })
    role: string

    @Column({ type: DataType.STRING, defaultValue: null })
    name: string;

    @Column({ type: DataType.TEXT, defaultValue: null })
    description: string;

    @Column({ type: DataType.STRING, defaultValue: null })
    requests: string;

    @Column({ type: DataType.STRING, defaultValue: null })
    requests_date: string;

    @BelongsToMany(() => Letters, () => LettersToUser)
    letters: Letters[];
}
