import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../connection";
import { GuildAttributes } from "@tidify/common";
import User from './User';
import GuildMember from './GuildMember';

interface GuildCreationAttributes
    extends Optional<GuildAttributes, 'id'> { }

interface GuildInstance
    extends Model<GuildAttributes, GuildCreationAttributes>,
    GuildAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const Guild = sequelize.define<GuildInstance>('Guild',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }
);

export default Guild; 

Guild.belongsToMany(User, {
    through: GuildMember,
    as: 'users',
    foreignKey: 'guildId'
})

User.belongsToMany(Guild, {
    through: GuildMember,
    as: 'guilds',
    foreignKey: 'userId'
})
