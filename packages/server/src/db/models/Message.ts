import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../connection";
import { MessageAttributes } from "@tidify/common";

interface MessageCreationAttributes
    extends Optional<MessageAttributes, 'id'> { }

interface MessageInstance
    extends Model<MessageAttributes, MessageCreationAttributes>,
    MessageAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const Message = sequelize.define<MessageInstance>('Message',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        guildId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        channelId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }
);

export default Message;
