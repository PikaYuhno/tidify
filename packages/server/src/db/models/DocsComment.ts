import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../connection";
import { DocsCommentAttributes } from "@tidify/common";

interface DocsCommentCreationAttributes
    extends Optional<DocsCommentAttributes, 'id'> { }

interface DocsCommentInstance
    extends Model<DocsCommentAttributes, DocsCommentCreationAttributes>,
    DocsCommentAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

export default sequelize.define<DocsCommentInstance>('DocsComment',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        docId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }
);
