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

  it('retrieves a reviewer by id', async () => {
    const reviewerData = await Reviewer.create(
      {
        name: 'Armando White',
        company: 'Troll Inc'
      },
    );
    const res = await request(app).get('/api/v1/reviewers/1');
    expect(res.body).toEqual({
      ...reviewerData.dataValues,
      updatedAt: reviewerData.dataValues.updatedAt.toISOString(),
      createdAt: reviewerData.dataValues.createdAt.toISOString()
    });
  });

  it('updates a reviewer', async () => {
    const reviewerData = await Reviewer.create(
      {
        name: 'Rooger Eggbert',
        company: 'Times Magazine'
      },
    );

    reviewerData.name = 'Roger Ebert';

    const res = await request(app).put(`/api/v1/reviewers/${reviewerData.id}`)
      .send(
        {
          name: 'Roger Ebert',
          company: 'Times Magazine'
        }
      );

    expect(res.body).toEqual({
      ...reviewerData.dataValues,
      updatedAt: expect.any(String),
      createdAt: reviewerData.dataValues.createdAt.toISOString()
    });

    expect(res.body.updatedAt).not
      .toEqual(reviewerData.dataValues.updatedAt.toISOString());
  });
});


