import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport'



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(passport.initialize());
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'chrome-extension://lcdkcfgilmllaaoikcnldghngnfjjkip'
    ],
    credentials: true,
    allowedHeaders: ["authorization", "Content-Type"]
  });
  await app.listen(8000);
}
bootstrap();
