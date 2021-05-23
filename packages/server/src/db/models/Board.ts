import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../connection";
import { BoardAttributes } from "@tidify/common";

interface BoardCreationAttributes
    extends Optional<BoardAttributes, 'id'> { }

interface BoardInstance
    extends Model<BoardAttributes, BoardCreationAttributes>,
    BoardAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

export default sequelize.define<BoardInstance>('Board',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }
);
