const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: ' Agency System API Spec',
        version: '1.0.0',
        description: 'Swagger API for Agency Management System',
        //add tags here   
        tags: [{
                "name": "Users",
                "description": "Everything about your Agency"
            },
            {
                "name": "Auth",
                "description": "User authentication and authorization"
            },
            {
                "name": "Growers",
                "description": "All operations related to growers"
            },
            {
                "name": "Roles",
                "description": "Role management and operations"
            },
            {
                "name": "Auction Sale",
                "description": "Manage auction sales"
            },
            {
                "name": "Departments",
                "description": "Manage departments"
            },
            {
                "name": "Gender",
                "description": "Operations related to gender information"
            },
            {
                "name": "Location",
                "description": "Country and county management"
            },
            {
                "name": "Grades",
                "description": "Coffee Grades"
            },
            {
                "name": "Agents Information",
                "description": "The agents managing API"
            }
        ]

    },
    servers: [{
        url: 'http://localhost:3000',
    }, ],
};

const options = {
    swaggerDefinition,
    apis: ['./app/server.js'], // Ensure this path is correct and references files with Swagger JSDoc comments
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;