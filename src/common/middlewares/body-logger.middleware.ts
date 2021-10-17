import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction } from 'express'

import { ConfigurationService } from '../../configuration/configuration.service'

@Injectable()
export class BodyLoggerMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(`BodyLoggerMiddleware`)

  public constructor(private readonly configurationService: ConfigurationService) {}

  public use(request: Request, _response: Response, next: NextFunction): void {
    if (!this.configurationService.isProduction) {
      this.logger.debug(`[Body]`, request.body)
    }

    next()
  }
}
