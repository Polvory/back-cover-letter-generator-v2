import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { getDbConfig } from '../config/db.config';
import { Users } from '../users/users.model';

@Module({
    imports: [
        SequelizeModule.forRootAsync({
            useFactory: () => ({
                dialect: 'postgres',
                host: getDbConfig().host,
                port: getDbConfig().port,
                username: getDbConfig().username,
                password: getDbConfig().password,
                database: getDbConfig().database,
                models: [
                    Users
                ],
                logging: false,
                autoLoadModels: true
            })
        }),
    ]
})
export class DbModule { }