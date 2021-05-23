import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../connection";
import {UserAttributes} from '@tidify/common';

interface UserCreationAttributes
    extends Optional<UserAttributes, 'id' | 'role' | 'verified' | 'locked' | 'avatar'> { }

interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const User = sequelize.define<UserInstance>('User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: "default-1.png",
        },
        role: {
            type: DataTypes.STRING(255),
            defaultValue: 'user',
        },
        locked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }
)
export default User;
