import sequelize from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Review from '../lib/models/Review.js';
import Film from '../lib/models/Film.js';

describe('reviews routes', () => {
  beforeEach(() => {
    return sequelize.sync({ force: true });
  });

  const review1 = {
    rating: 3,
    review: 'I thought it was not that great but kind of good.',
  };

  const review2 = {
    rating: 5,
    review: 'it sucked',
  };

  it('creates reviews via POST', async () => {
    const film = await Film.create({ title: 'The Room', studio: '1', released: 2003 });

    const res = await request(app)
      .post('/api/v1/reviews')
      .send({ ...review1, filmId: film.id });
    
    expect(res.body).toEqual({
      ...review1,
      id: 1,
      filmId: film.id,
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });

  it('gets all reviews via GET', async () => {
    const film1 = await Film.create({ title: 'The Room', studio: '1', released: 2003 });
    const film2 = await Film.create({ title: 'Clotheslines', studio: '2', released: 1981 });

    await Review.create({ ...review1, filmId: film1.id, reviewer: '1' });
    await Review.create({ ...review2, filmId: film2.id, reviewer: '1' });

    const res = await request(app).get('/api/v1/reviews');

    expect(res.body).toEqual([
      {
        ...review1,
        film: { id: 1, title: 'The Room' },
        id: 1,
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
      },
      {
        ...review2,
        film: { id: 2, title: 'Clotheslines' },
        id: 2,
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
      }
    ]);
  });

  it('delete review by id via DELETE', async () => {
    const review = await Review.create(review1);

    await request(app)
      .delete(`/api/v1/reviews/${review.id}`);
    const res = await request(app)
      .get('/api/v1/reviews');

    expect(res.body).not.toEqual(expect.arrayContaining([
      {
        ...review1,
        id: 1,
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
      }
    ]));
  });
});
