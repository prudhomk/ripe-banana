import sequelize from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Review from '../lib/models/Review.js';

describe('reviews routes', () => {
  beforeEach(() => {
    return sequelize.sync({ force: true });
  });

  it('creates reviews via POST', async () => {
    const res = await request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 3,
        review: 'I thought it was not that great but kind of good.'
      });
    expect(res.body).toEqual({
      id: 1,
      rating: 3,
      review: 'I thought it was not that great but kind of good.',
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });
});
