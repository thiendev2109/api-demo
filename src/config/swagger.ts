import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerUIStyles } from '../utils/constants';

export const swaggerDocument = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('The blog api')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document, {
    useGlobalPrefix: false,
    jsonDocumentUrl: '/docs/json',
    ...swaggerUIStyles,
  });
};
