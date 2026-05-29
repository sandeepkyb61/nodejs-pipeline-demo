const { describe, it } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('../app');

describe('App Routes', () => {
  let server;
  let baseUrl;

  // Test the root route returns the expected JSON message
  it('should return a JSON message on GET /', (_, done) => {
    server = app.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://localhost:${port}`;

      http.get(`${baseUrl}/`, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          const body = JSON.parse(data);
          assert.strictEqual(res.statusCode, 200);
          assert.strictEqual(body.message, 'Hello from Azure DevOps CI/CD Pipeline!');
          assert.strictEqual(body.status, 'running');
          server.close();
          done();
        });
      });
    });
  });

  // Test the health route returns healthy status with a timestamp
  it('should return healthy status on GET /health', (_, done) => {
    server = app.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://localhost:${port}`;

      http.get(`${baseUrl}/health`, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          const body = JSON.parse(data);
          assert.strictEqual(res.statusCode, 200);
          assert.strictEqual(body.status, 'healthy');
          assert.ok(body.timestamp);
          server.close();
          done();
        });
      });
    });
  });
});