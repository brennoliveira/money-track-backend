import swaggerJSDoc from 'swagger-jsdoc'

export const swaggerOptions = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MoneyTrack API',
      version: '1.0.0',
      description: 'API para controle financeiro pessoal'
    },
    servers: [
      {
        url: 'http://168.75.86.2:3000',
        description: 'Servidor de Produção'
      },
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local'
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
