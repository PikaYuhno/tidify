import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../connection";
import { EventAttributes } from "@tidify/common";
import Guild from "./Guild";

interface EventCreationAttributes
    extends Optional<EventAttributes, 'id'> { }

interface EventInstance
    extends Model<EventAttributes, EventCreationAttributes>,
    EventAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const Event = sequelize.define<EventInstance>('Event',
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
        start: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        guildId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }
);

export default Event;

Guild.hasMany(Event, {
    foreignKey: 'guildId',
    as: 'events'
});

Event.belongsTo(Guild, {
    foreignKey: 'guildId',
    as: 'guild'
});