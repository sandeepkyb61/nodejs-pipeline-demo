const express = require('express');
const app = express();

// Root route - returns a JSON greeting and status
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Azure DevOps CI/CD Pipeline!', status: 'running' });
});

// Health check route - returns current server health
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

module.exports = app;