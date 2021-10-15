import { plural } from 'pluralize'
import { snakeCase } from 'typeorm/util/StringUtils'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export class SnakeCaseNamingStrategy extends SnakeNamingStrategy {
  // eslint-disable-next-line class-methods-use-this
  public tableName(className: string, customName: string): string {
    return Boolean(customName) ? customName : snakeCase(plural(className))
  }
}
