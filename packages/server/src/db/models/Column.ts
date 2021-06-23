import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../connection";
import { ColumnAttributes } from "@tidify/common";
import Task from "./Task";

interface ColumnCreationAttributes
    extends Optional<ColumnAttributes, 'id'> { }

interface ColumnInstance
    extends Model<ColumnAttributes, ColumnCreationAttributes>,
    ColumnAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const Column = sequelize.define<ColumnInstance>('Column',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        boardId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
);

Column.hasMany(Task, {
    foreignKey: 'colId',
    as: 'tasks'
});

Task.belongsTo(Column, {
    foreignKey: 'colId',
    as: 'column'
})

export default Column;