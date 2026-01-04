import swaggerJSDoc from 'swagger-jsdoc'

export const swaggerOptions = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MoneyTrack API',
      version: '1.0.0',
      description: 'API documentation for MoneyTrack application',
    },
    servers: [
      {
        url: 'http://168.75.86.2:3000',
        description: 'Production Server'
      },
      {
        url: 'http://localhost:3000',
        description: 'Local Host'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },

  apis: [
    'src/Routes/**/*.ts',
    'src/Routes/**/*.js',
  ]
})
