import { Sequelize, Options } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

interface ConfigProps extends Options {
  host: string;
  username: string;
  password: string;
  database: string;
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | undefined;
}

const config: ConfigProps = {
  host: String(process.env.DB_HOST),
  username: String(process.env.DB_USER),
  password: String(process.env.DB_PASS),
  database: String(process.env.DB_NAME),
  dialect: process.env.NODE_ENV === 'test' ? 'sqlite' : 'mysql',
  storage: './tests/database.sqlite',
  define: {
    timestamps: false,
  },
};

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
