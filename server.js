const app = require('./app');

// Use the PORT environment variable (set by Azure App Service) or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});