import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { DataTypes } from 'sequelize'
import { Topics } from "../topics/topics.model";


@Table({ tableName: 'question' })
export class Question extends Model<Question> {

    @Column({ type: DataTypes.STRING, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true })
    id: string;

    @Column({ type: DataType.TEXT })
    text: string;

    @Column({ type: DataType.TEXT })
    code: string;

    @Column({ type: DataType.TEXT })
    result: string;

    @Column({ type: DataType.TEXT })
    hint: string;

    @Column({ type: DataType.STRING })
    type: string;

    // Связь с топиком
    @ForeignKey(() => Topics)
    @Column({ type: DataTypes.STRING, allowNull: false })
    topicId: string;

    @BelongsTo(() => Topics)
    topic: Topics;
}