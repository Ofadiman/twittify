import { IsEnum, IsNumberString, IsString } from 'class-validator'

import { NodeEnv } from '../../common/enums/node-env.enum'
import { EnvironmentVariable } from '../enums/environment-variable.enum'

export class EnvironmentVariablesDto {
  @IsNumberString()
  public [EnvironmentVariable.ServerPort]: string

  @IsEnum(NodeEnv)
  public [EnvironmentVariable.NodeEnv]: NodeEnv

  @IsString()
  public [EnvironmentVariable.PostgresDatabase]: string

  @IsString()
  public [EnvironmentVariable.PostgresHost]: string

  @IsString()
  public [EnvironmentVariable.PostgresPassword]: string

  @IsNumberString()
  public [EnvironmentVariable.PostgresPort]: string

  @IsString()
  public [EnvironmentVariable.PostgresUser]: string
}
