require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'production'

exports.swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "ZABUNI API",
        version: "1.0.0",
        description:
          "Zabuni API Documentation",
        license: {
          name: "MIT",
          url: "https://zabuni.ke"
        },
        contact: {
          name: "Zabuni Support",
          url: "https://zabuni.ke",
          email: "info@zabuni.ke"
        }
      },
      servers: [
        {
          url: isProduction ? "https://zabunike.herokuapp.com/" : "http://localhost:8080/",
          description: isProduction ? "Production Server" : "Local server"
        }
      ]
    },
    apis: ["./swagger/api-method-docs.js"]
  };