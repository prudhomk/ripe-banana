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
    
    const Studios = await Studio.bulkCreate([
      {
        id: '1',
        name: 'Fox',
        city: 'Hollywood',
        state: 'California',
        country: 'United States'
      },
      {
        id: '2',
        name: 'Paramount',
        city: 'Hollywood',
        state: 'California',
        country: 'United States'
      },
      {
        id: '3',
        name: 'Kinet',
        city: 'New York',
        state: 'New York',
        country: 'United States'
      }
    ]);
    
    const res = await request(app).get('/api/v1/studios');
    expect(res.body).toEqual({ Studios: [{
      id: '1',
      name: 'Fox',
      city: 'Hollywood',
      state: 'California',
      country: 'United States'
    },
    {
      id: '2',
      name: 'Paramount',
      city: 'Hollywood',
      state: 'California',
      country: 'United States'
    },
    {
      id: '3',
      name: 'Kinet',
      city: 'New York',
      state: 'New York',
      country: 'United States'
    }], updatedAt: Studios.updatedAt.toISOString(), createdAt: Studios.createdAt.toISOString() });

  });
});
