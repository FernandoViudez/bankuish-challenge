import { Module } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { environment } from '../config/environment';

const ORMConfig: DataSourceOptions = {
  type: environment.db.type,
  host: environment.db.host,
  port: environment.db.port,
  username: environment.db.user.name,
  password: environment.db.user.password,
  database: environment.db.name,
  entities: [__dirname + '/../**/*.model.{js,ts}'],
  synchronize: true,
};

const dbProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(ORMConfig);
      return dataSource.initialize();
    },
  },
];

@Module({
  providers: [...dbProviders],
  exports: [...dbProviders],
})
export class DatabaseModule {}
