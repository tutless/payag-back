import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions} from "@nestjs/microservices"
import { grpcClientOptions } from './grpc-client.options';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.connectMicroservice<MicroserviceOptions>(grpcClientOptions)
  // await app.startAllMicroservices();
  await app.listen(8000);
}
bootstrap();
