const shuffle = require("../src/shuffle");

describe("shuffle", () => {
  it("should return an array with the same length as the input array", () => {
    const input = [1, 2, 3, 4, 5];
    const shuffled = shuffle(input);

    expect(shuffled).toHaveLength(input.length);
  });

  it("should return a shuffled array with different order than the input array", () => {
    const input = [1, 2, 3, 4, 5];
    const shuffled = shuffle(input);

    expect(shuffled).not.toEqual(input);
  });
});
const request = require('supertest');
const rollbar = require('rollbar');
const app = require('./server');


rollbar.init(process.env.bb03022de423e965ecead13ee9e28);


app.use((err, req, res, next) => {
  rollbar.error(err);
  res.status(500).send('Something went wrong');
});

describe('API Tests', () => {
  
  it('should return the list of robots', async () => {
    const response = await request(app).get('/api/robots');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  
  it('should return shuffled robots', async () => {
    const response = await request(app).get('/api/robots/shuffle');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    // Add additional assertions to validate the shuffled array
  });

  
  it('should return the result of a duel', async () => {
    const duelData = {
      compDuo: [
        
      ],
      playerDuo: [
              ],
    };
    const response = await request(app).post('/api/duel').send(duelData);
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('string');
    
  });

  
  it('should return the player record', async () => {
    const response = await request(app).get('/api/player');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('wins');
    expect(response.body).toHaveProperty('losses');
  });
});

