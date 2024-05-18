// swaggerOptions.js

module.exports = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Open AI Assistant App',
            version: '1.0.0',
            description: 'API documentation for Open AI Assistant App application',
        },
    },
    apis: ['./route.js'], // Path to the API routes file(s)
};
