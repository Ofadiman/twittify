import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import { NodeEnv } from '../common/enums/node-env.enum'
import { SnakeCaseNamingStrategy } from '../database/utils/snake-case-naming-strategy'
import { EnvironmentVariables } from './enums/environment-variables.enum'

@Injectable()
export class ConfigurationService {
  public constructor(private readonly configService: ConfigService) {}

  public get<ReturnType extends string>(environmentVariable: EnvironmentVariables): ReturnType {
    return this.configService.get(environmentVariable) as ReturnType
  }

  public get typeOrmModuleOptions(): TypeOrmModuleOptions {
    const cwd: string = process.cwd()

    return {
      autoLoadEntities: true,
      cli: {
        migrationsDir: `${cwd}/src/database/migrations`
      },
      database: this.get(EnvironmentVariables.PostgresDatabase),
      entities: [`${cwd}/dist/**/*.entity.js`],
      host: this.get(EnvironmentVariables.PostgresHost),
      keepConnectionAlive: true,
      logging: [`error`, `query`],
      migrations: [`${cwd}/dist/src/database/migrations/*.js`],
      migrationsRun: true,
      namingStrategy: new SnakeCaseNamingStrategy(),
      password: this.get(EnvironmentVariables.PostgresPassword),
      port: Number(this.get(EnvironmentVariables.PostgresPort)),
      subscribers: [`${cwd}/dist/**/*.subscriber.js`],
      synchronize: false,
      type: `postgres`,
      username: this.get(EnvironmentVariables.PostgresUser)
    } as TypeOrmModuleOptions
  }

  public get jwtModuleOptions(): JwtModuleOptions {
    return {
      secret: this.get(EnvironmentVariables.JwtSecret),
      signOptions: {
        expiresIn: `60m`,
        issuer: `twitter-clone`
      }
    }
  }

  public get isProduction(): boolean {
    const currentNodeEnv: NodeEnv = this.get(EnvironmentVariables.NodeEnv)

    return currentNodeEnv === NodeEnv.Production
  }
}
