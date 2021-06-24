import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('retrieves studios via GET', async () => {
    const res = await request(app).get('/studios');

    expect(res).toEqual([{
      id: expect.any(Number),
      name: expect.any(String)
    }]);

  });
});
