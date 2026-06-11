const swaggerJsdoc = require('swagger-jsdoc');

function getSwaggerSpec(baseUrl) {
  return swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'School Management API',
        version: '1.0.0',
        description: 'API for managing students, teachers, classes, courses, grades, and attendance',
      },
      servers: [{ url: baseUrl, description: 'Server' }],
    },
    apis: ['./src/routes/*.js', './src/models/*.js'],
  });
}

module.exports = getSwaggerSpec;
