import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { getDbConfig } from '../config/db.config';

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

                ],
                logging: false,
                autoLoadModels: true
            })
        }),
    ]
})
export class DbModule { }