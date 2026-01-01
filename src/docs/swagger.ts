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
        url: 'http://localhost:3000',
        description: 'Servidor Local'
      },
      {
        url: 'https://money-track-backend-production.up.railway.app/',
        description: 'Servidor de Produção'
      }
    ]
  },
  apis: ['src/routes/**/*.ts']
})
