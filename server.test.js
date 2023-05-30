const request = require('supertest');
const rollbar = require('rollbar');
const app = require('./server');

// Configure Rollbar
rollbar.init(process.env.ROLLBAR_ACCESS_TOKEN);

// Error handler middleware
app.use((err, req, res, next) => {
    rollbar.error(err);
    res.status(500).send('Something went wrong');
});

describe('API Tests', () => {
    // Test GET /api/robots endpoint
    it('should return the list of robots', async () => {
        const response = await request(app).get('/api/robots');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test GET /api/robots/shuffle endpoint
    it('should return shuffled robots', async () => {
        const response = await request(app).get('/api/robots/shuffle');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        // Add additional assertions to validate the shuffled array
    });

    // Test POST /api/duel endpoint
    it('should return the result of a duel', async () => {
        const duelData = {
            compDuo: [
                // Add sample data for compDuo
            ],
            playerDuo: [
                // Add sample data for playerDuo
            ],
        };
        const response = await request(app).post('/api/duel').send(duelData);
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('string');
        // Add additional assertions to validate the duel result
    });

    // Test GET /api/player endpoint
    it('should return the player record', async () => {
        const response = await request(app).get('/api/player');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('wins');
        expect(response.body).toHaveProperty('losses');
    });
});
