import sequelize from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('films routes', () => {
  beforeEach(() => {
    return sequelize.sync({ force: true });
  });

  const room = {
    title: 'The Room',
    studio: 'Wiseau-Films',
    released: 2003
  };

  const clotheslines = {
    title: 'Clotheslines',
    studio: 'Buffalo Rose Productions',
    released: 1981
  };

  const tampopo = {
    title: 'Tampopo',
    studio: 'Toho',
    released: 1985
  };

  it('POST route for films', async () => {
    const res = await request(app) 
      .post('/api/v1/films')
      .send(room)
    ;

    expect(res.body).toEqual({
      id: expect.any(Number),
      ...room,
      released: room.released.toISOString(),
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });
});

