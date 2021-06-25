import sequelize from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Actor from '../lib/models/Actor.js';

describe('actors routes', () => {
  beforeEach(() => {
    return sequelize.sync({ force: true });
  });

  const martinShort = {
    name: 'Martin Short',
    dob: new Date('1950-03-26'),
    pob: 'Hamilton, Ontario, Canada'
  };

  it('POST route for actors', async () => {
    const res = await request(app) 
      .post('/api/v1/actors')
      .send(martinShort)
    ;

    expect(res.body).toEqual({
      id: expect.any(Number),
      ...martinShort,
      dob: martinShort.dob.toISOString(),
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });

  it('GET actor by id', async () => {
    // post an actor
    Actor.create(martinShort);

    // get that actor
    const res = await request(app)
      .get('/api/v1/actors')
    ;

    // test 
    expect.toString(res.body).toEqual({
      ...martinShort,
      dob: martinShort.dob.toISOString(),
      id: expect.any(Number),
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });
});
