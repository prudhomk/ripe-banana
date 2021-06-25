import sequelize from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Reviewer from '../lib/models/Reviewer.js';

describe('reviewers routes', () => {
  beforeEach(() => {
    return sequelize.sync({ force: true });
  });

  it('adds a reviewer via POST', async () => {
    const res = await request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Roger Ebert',
        company: 'Robert Eger'
      });
    expect(res.body).toEqual({
      id: 1,
      name: 'Roger Ebert',
      company: 'Robert Eger',
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });
});


