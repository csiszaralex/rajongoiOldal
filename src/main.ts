import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config';

async function bootstrap() {
  const serverConfig: any = config.get('server');
  const logger = new Logger('Start');
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log('App started on port ' + port);
}
bootstrap();
