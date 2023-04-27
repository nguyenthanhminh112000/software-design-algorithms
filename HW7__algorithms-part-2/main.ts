import { ValidationPipe } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RoleService } from './services/role.service';

const setUpSwagger = (app: INestApplication, configService: ConfigService) => {
  const appName = configService.get('APP_NAME');
  const apiPrefix = configService.get('API_PREFIX');
  const swaggerDocConfig = new DocumentBuilder()
    .setTitle(`${appName} API`)
    .setDescription(`${appName} API`)
    .setVersion('1.0')
    .addTag(appName)
    .setBasePath(apiPrefix)
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerDocConfig);
  SwaggerModule.setup('swagger', app, swaggerDocument);
};

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT');
  const apiPrefix = configService.get('API_PREFIX');

  // init all roles in application
  const roleService = app.get<RoleService>(RoleService);
  roleService.createApplicationRoles();

  // set api prefix
  app.setGlobalPrefix(apiPrefix);

  // set global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // setup swagger
  setUpSwagger(app, configService);

  app.enableCors();

  // start application on port
  await app.listen(port, () =>
    console.log(`Server is running on port ${port}`),
  );
}

bootstrap();
