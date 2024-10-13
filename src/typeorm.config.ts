import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

const config: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'db',
  synchronize: false,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [`${__dirname}/migrations/*.ts`],
};

export const AppDataSource = new DataSource(config);

AppDataSource.initialize()
  .then(() => console.log(`Connected to Data Source!`))
  .catch((err) => {
    throw err;
  });
