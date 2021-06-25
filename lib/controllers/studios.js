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
      .then(studios => res.send(studios))
      .catch(next);
  })
  .get('/studios/:id', (req, res, next) => {
    Studio.findByPk(req.params.id)
      .then(studio => res.send(studio))
      .catch(next);
  })
;
