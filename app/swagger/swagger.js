const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const options = {
  info: {
    title: 'This is my API Document',
    description: '이렇게 스웨거 자동생성이 됩니다.',
  },
  servers: [
    {
      url: 'http://localhost:8080',
    },
  ],
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      in: 'header',
      bearerFormat: 'JWT',
    },
  },
};
const outputFile = './app/swagger/swagger-output.json';
const endpointsFiles = ['./app/routes/auth.routes.js','./app/routes/user.routes.js','./app/routes/turorial.routes.js'];
swaggerAutogen(outputFile, endpointsFiles, options);