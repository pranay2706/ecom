import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const server = await NestFactory.create(AppModule);
  server.setGlobalPrefix('api');
  await server.listen(3003);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3001,
        host: '127.0.0.1',
      },
    },
  );
  await app.listen();
}
bootstrap();
