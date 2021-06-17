import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const createConnection = (): Sequelize => {
    const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USERNAME!, process.env.DB_PASSWORD!, {
      host: process.env.NODE_ENV === "production" ? "db" : "localhost",
      dialect: 'postgres',
      port: parseInt(process.env.DB_PORT || "5432")
    });

    return sequelize
}

export const sequelize = createConnection();
