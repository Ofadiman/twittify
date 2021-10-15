import { NestApplication, NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

void (async function bootstrap(): Promise<void> {
  const nestApplication: NestApplication = await NestFactory.create(AppModule)

  await nestApplication.listen(3_000)
})()
