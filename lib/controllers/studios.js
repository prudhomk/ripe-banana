import { Router } from 'express';
import Studio from '../models/Studio.js';

export default Router()
  .post('/studios', (req, res, next) => {
    Studio.create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  })
  .get('/studios', (req, res, next) => {
    Studio.findAll()
      .then(studio => res.send(studio))
      .catch(next);
  });

