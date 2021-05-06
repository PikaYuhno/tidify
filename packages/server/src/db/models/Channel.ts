import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../connection";
import { ChannelAttributes } from "@tidify/common";
import Guild from "./Guild";
import Message from "./Message";

interface ChannelCreationAttributes
    extends Optional<ChannelAttributes, 'id'> { }

interface ChannelInstance
    extends Model<ChannelAttributes, ChannelCreationAttributes>,
    ChannelAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}
const Channel = sequelize.define<ChannelInstance>('Channel',
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
        guildId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
);

export default Channel;

Guild.hasMany(Channel, {
    foreignKey: 'guildId',
    as: 'channels'
});

Channel.belongsTo(Guild, {
    foreignKey: 'guildId',
    as: 'guild'
});

Channel.hasMany(Message, {
    foreignKey: 'channelId',
    as: 'messages'
});

Message.belongsTo(Channel, {
    foreignKey: 'channelId',
    as: 'channel'
})
