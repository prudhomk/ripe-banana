import sequelize from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('films routes', () => {
  beforeEach(() => {
    return sequelize.sync({ force: true });
  });

  const room = {
    title: 'The Room',
    studio: '1',
    released: 2003
  };

  const clotheslines = {
    title: 'Clotheslines',
    studio: '2',
    released: 1981
  };

  const tampopo = {
    title: 'Tampopo',
    studio: '3',
    released: 1985
  };

  it.only('POST route for films', async () => {
    const res = await request(app) 
      .post('/api/v1/films')
      .send(room)
    ;

    expect(res.body).toEqual({
      id: expect.any(Number),
      ...room,
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });
});

