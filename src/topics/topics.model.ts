import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { DataTypes } from 'sequelize'
import { Question } from "../questions/question.model";



@Table({ tableName: 'topics' })
export class Topics extends Model<Topics> {

    @Column({ type: DataTypes.STRING, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true })
    id: string;

    @Column({ type: DataType.TEXT })
    header: string;

    @Column({ type: DataType.TEXT })
    description: string;


    @Column({ type: DataType.STRING })
    image: string;
    // Связь с вопросами
    @HasMany(() => Question)
    questions: Question[];
}