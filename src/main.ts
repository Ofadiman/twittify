import { NestApplication, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces'

import { AppModule } from './app.module'
import { ConfigurationService } from './configuration/configuration.service'
import { EnvironmentVariables } from './configuration/enums/environment-variables.enum'

const setupOpenApi = (nestApplication: NestApplication): void => {
  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle(`Twitter clone API.`)
    .setDescription(`API documentation for twitter clone application.`)
    .setVersion(`1.0`)
    .addBasicAuth()
    .addBearerAuth()
    .build()

  const document: OpenAPIObject = SwaggerModule.createDocument(nestApplication, config)
  SwaggerModule.setup(`swagger`, nestApplication, document)
}

void (async function bootstrap(): Promise<void> {
  const nestApplication: NestApplication = await NestFactory.create(AppModule)

  setupOpenApi(nestApplication)

  const configurationService: ConfigurationService = nestApplication.get(ConfigurationService)

  const serverPort: string = configurationService.get(EnvironmentVariables.ServerPort)
  await nestApplication.listen(serverPort)
})()
