const express = require('express');
const assistantRoutes = require('./route');
const swaggerData = require('./swagger');
const swaggerUi = require('swagger-ui-express');

// Setup Express
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerData));

app.use('/', assistantRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});