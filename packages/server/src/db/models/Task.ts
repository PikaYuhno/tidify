import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../connection";
import { TaskAttributes } from "@tidify/common";

interface TaskCreationAttributes
    extends Optional<TaskAttributes, 'id'> { }

interface TaskInstance
    extends Model<TaskAttributes, TaskCreationAttributes>,
    TaskAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

export default sequelize.define<TaskInstance>('Task',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        colId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }
);
