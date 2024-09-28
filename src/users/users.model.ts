import { Column, DataType, Model, Table } from "sequelize-typescript";
import { DataTypes } from 'sequelize'


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

    @Column({ type: DataType.STRING, defaultValue: null })
    one_time_code: string;

}
