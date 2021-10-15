import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import { SnakeCaseNamingStrategy } from '../database/utils/snake-case-naming-strategy'
import { EnvironmentVariable } from './enums/environment-variable.enum'

@Injectable()
export class ConfigurationService {
  public constructor(private readonly configService: ConfigService) {}

  public get<ReturnType extends string>(environmentVariable: EnvironmentVariable): ReturnType {
    return this.configService.get(environmentVariable) as ReturnType
  }

  public get typeOrmModuleOptions(): TypeOrmModuleOptions {
    const cwd: string = process.cwd()

    return {
      autoLoadEntities: true,
      cli: {
        migrationsDir: `${cwd}/src/database/migrations`
      },
      database: this.get(EnvironmentVariable.PostgresDatabase),
      entities: [`${cwd}/dist/**/*.entity.js`],
      host: this.get(EnvironmentVariable.PostgresHost),
      keepConnectionAlive: true,
      migrations: [`${cwd}/dist/src/database/migrations/*.js`],
      migrationsRun: true,
      namingStrategy: new SnakeCaseNamingStrategy(),
      password: this.get(EnvironmentVariable.PostgresPassword),
      port: Number(this.get(EnvironmentVariable.PostgresPort)),
      subscribers: [`${cwd}/dist/**/*.subscriber.js`],
      synchronize: false,
      type: `postgres`,
      username: this.get(EnvironmentVariable.PostgresUser)
    } as TypeOrmModuleOptions
  }
}
