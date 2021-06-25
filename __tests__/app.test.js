import sequelize from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Studio from '../lib/models/Studio.js';
import studios from '../lib/controllers/studios.js';

describe('demo routes', () => {
  beforeEach(() => {
    return sequelize.sync({ force: true });
  });

  it('retrieves studios via GET', async () => {
    
    const studioData = await Studio.bulkCreate([
      {
        name: 'Fox',
        city: 'Hollywood',
        state: 'California',
        country: 'United States'
      },
      {
        name: 'Paramount',
        city: 'Hollywood',
        state: 'California',
        country: 'United States'
      },
      {
        name: 'Kinet',
        city: 'New York',
        state: 'New York',
        country: 'United States'
      }
    ]);
    console.log('hello', studioData[0].dataValues.createdAt);
    const res = await request(app).get('/api/v1/studios');
    expect(res.body).toEqual([{ 
      ...studioData[0].dataValues,
      updatedAt: studioData[0].dataValues.updatedAt.toISOString(),
      createdAt: studioData[0].dataValues.createdAt.toISOString() },
      
    { ...studioData[1].dataValues,
      updatedAt: studioData[1].dataValues.updatedAt.toISOString(),
      createdAt: studioData[1].dataValues.createdAt.toISOString() },

    { ...studioData[2].dataValues,
      updatedAt: studioData[2].dataValues.updatedAt.toISOString(),
      createdAt: studioData[2].dataValues.createdAt.toISOString(),
    }]);

  });
});
