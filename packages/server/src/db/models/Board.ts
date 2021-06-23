import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../connection";
import { BoardAttributes } from "@tidify/common";
import Column from "./Column";

interface BoardCreationAttributes
    extends Optional<BoardAttributes, 'id'> { }

interface BoardInstance
    extends Model<BoardAttributes, BoardCreationAttributes>,
    BoardAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const Board = sequelize.define<BoardInstance>('Board',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        guildId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
);


Board.hasMany(Column, {
    foreignKey: 'boardId',
    as: 'columns'
});

Column.belongsTo(Board, {
    foreignKey: 'boardId',
    as: 'user'
})

export default Board;