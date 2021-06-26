import { Router } from 'express';
import Film from '../models/Film.js';

export default Router()
  .post('/films', (req, res, next) => {
    Film.create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })
  .get('/films', (req, res, next) => {
    Film.findAll()
      .then(films => res.send(films))
      .catch(next);
  });
