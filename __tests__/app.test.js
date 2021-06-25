import sequelize from '../lib/utils/sequelize.js';
import request from 'supertest';
import app from '../lib/app.js';


describe('demo routes', () => {
  beforeEach(() => {
    return sequelize.sync({ force: true });
  });

  it('retrieves studios via GET', async () => {
    
    const studio = await Studio.create({
      id: '1',
      name: 'Fox'
    });
    
    const res = await request(app).get('/studios');
    expect(res).toEqual([{
      id: expect.any(Number),
      name: expect.any(String)
    }]);

  });
});
