import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { DataTypes } from 'sequelize'
import { Users } from "src/users/users.model";
import { LettersToUser } from "./lettersToUser";


@Table({ tableName: 'letters' })
export class Letters extends Model<Letters> {

    @Column({ type: DataTypes.STRING, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true })
    id: string;

    @Column({ type: DataType.TEXT })
    request_text: string;

    @Column({ type: DataType.TEXT })
    text: string;

    @BelongsToMany(() => Users, () => LettersToUser)
    users: Users[];
}