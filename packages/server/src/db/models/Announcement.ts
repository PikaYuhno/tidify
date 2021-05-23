import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../connection";
import { AnnouncementAttributes } from "@tidify/common";

interface AnnouncementCreationAttributes
    extends Optional<AnnouncementAttributes, 'id'> { }

interface AnnouncementInstance
    extends Model<AnnouncementAttributes, AnnouncementCreationAttributes>,
    AnnouncementAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

export default sequelize.define<AnnouncementInstance>('Announcement',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        guildId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }
);
