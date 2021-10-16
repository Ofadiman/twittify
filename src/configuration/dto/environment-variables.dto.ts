import { IsEnum, IsNumberString, IsString, Length } from 'class-validator'

import { NodeEnv } from '../../common/enums/node-env.enum'
import { EnvironmentVariables } from '../enums/environment-variables.enum'
import { EnvironmentVariablesConstraints } from '../enums/environment-variables-constraints.enum'

export class EnvironmentVariablesDto {
  @IsNumberString()
  public [EnvironmentVariables.ServerPort]: string

  @IsEnum(NodeEnv)
  public [EnvironmentVariables.NodeEnv]: NodeEnv

  @IsString()
  public [EnvironmentVariables.PostgresDatabase]: string

  @IsString()
  public [EnvironmentVariables.PostgresHost]: string

  @IsString()
  public [EnvironmentVariables.PostgresPassword]: string

  @IsNumberString()
  public [EnvironmentVariables.PostgresPort]: string

  @IsString()
  public [EnvironmentVariables.PostgresUser]: string

  @IsString()
  @Length(
    EnvironmentVariablesConstraints.MinimumJwtSecretLength,
    EnvironmentVariablesConstraints.MaximumJwtSecretLength
  )
  public [EnvironmentVariables.JwtSecret]: string
}
