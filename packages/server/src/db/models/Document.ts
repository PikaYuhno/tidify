import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../connection";
import { DocumentAttributes } from "@tidify/common";

interface DocumentCreationAttributes
    extends Optional<DocumentAttributes, 'id'> { }

interface DocumentInstance
    extends Model<DocumentAttributes, DocumentCreationAttributes>,
    DocumentAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

export default sequelize.define<DocumentInstance>('Document',
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
        filename: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }
);
