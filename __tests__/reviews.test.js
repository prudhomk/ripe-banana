import sequelize from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Review from '../lib/models/Review.js';

describe('reviews routes', () => {
  beforeEach(() => {
    return sequelize.sync({ force: true });
  });

  const review1 = {
    rating: 3,
    review: 'I thought it was not that great but kind of good.'
  };

  const review2 = {
    rating: 5,
    review: 'it sucked'
  };

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

  it('gets a review by id via GET', async () => {
    const review = await Review.create(review1);

    const res = await request(app)
      .get(`/api/v1/reviews/${review.id}`)
    ;

    expect(res).toEqual({
      ...review1,
      id: 1,
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });

  it('gets all reviews via GET', async () => {
    await Review.create(review1);
    await Review.create(review2);

    const res = await request(app).get('/api/v1/reviews');

    expect(res.body).toEqual([
      {
        ...review1,
        id: 1,
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
      },
      {
        ...review2,
        id: 2,
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
      }
    ]);
  });
});
