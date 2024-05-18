// swagger.js

const fs = require('fs');
const yaml = require('js-yaml');

// Load Swagger YAML file
const swaggerFile = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerData = yaml.load(swaggerFile);

module.exports = swaggerData;
