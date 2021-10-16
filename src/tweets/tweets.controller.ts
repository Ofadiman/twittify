import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'

import { CreateTweetBodyDto } from './dto/create-tweet.dto'
import { Tweet } from './tweet.entity'
import { TweetsService } from './tweets.service'

@Controller(`tweets`)
@ApiTags(TweetsController.name)
@Crud({
  dto: {
    create: CreateTweetBodyDto
  },
  model: {
    type: Tweet
  },
  routes: {
    only: [`createOneBase`]
  }
})
export class TweetsController implements CrudController<Tweet> {
  public constructor(public readonly service: TweetsService) {}
}
