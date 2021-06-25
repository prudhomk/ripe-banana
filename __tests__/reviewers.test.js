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

  it('retrieves all reviewers via GET', async () => {
    const reviewerData = await Reviewer.bulkCreate([
      {
        name: 'Roper Egger',
        company: 'Randy Ebbs' 
      },
      {
        name: 'Armando White',
        company: 'Troll Inc'
      },
      {
        name: 'Jiminy Glick',
        company: 'Hollywood Blvd'
      }
    ]);

    const res = await request(app).get('/api/v1/reviewers');
    expect(res.body).toEqual([{
      ...reviewerData[0].dataValues,
      updatedAt: reviewerData[0].dataValues.updatedAt.toISOString(),
      createdAt: reviewerData[0].dataValues.createdAt.toISOString() },
    {
      ...reviewerData[1].dataValues,
      updatedAt: reviewerData[1].dataValues.updatedAt.toISOString(),
      createdAt: reviewerData[1].dataValues.createdAt.toISOString() },
    {
      ...reviewerData[2].dataValues,
      updatedAt: reviewerData[2].dataValues.updatedAt.toISOString(),
      createdAt: reviewerData[2].dataValues.createdAt.toISOString() }
    ]);
  });
});


