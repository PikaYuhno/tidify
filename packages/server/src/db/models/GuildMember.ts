import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../connection";
import { GuildMemberAttributes } from "@tidify/common";

interface GuildMemberCreationAttributes
    extends Optional<GuildMemberAttributes, 'userId' | 'guildId'> { }

interface GuildMemberInstance
    extends Model<GuildMemberAttributes, GuildMemberCreationAttributes>,
    GuildMemberAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const GuildMember = sequelize.define<GuildMemberInstance>('GuildMember',
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        guildId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
    }
);
export default GuildMember;
