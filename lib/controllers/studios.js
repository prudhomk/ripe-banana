import { Router } from 'express';
import Studio from '../models/Studio.js';

export default Router()
  .get('/studios', (req, res, next) => {
    Studio.findAll({
      attributes: ['name', 'city', 'state', 'country']
    })
      .then(studio => res.send(studio))
      .catch(next);
  });

