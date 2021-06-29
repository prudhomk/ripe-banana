import { Router } from 'express';
import Review from '../models/Review.js';

export default Router()
  .post('/reviews', (req, res, next) => {
    Review.create(req.body)
      .then(review => res.send(review))
      .catch(next);
  })

  .get('/reviews/:id', (req, res, next) => {
    Review.findByPk(req.params.id)
      .then(review => res.send(review))
      .catch(next);
  })

  .get('/reviews', (req, res, next) => {
    Review.findAll()
      .then(reviews => res.send(reviews))
      .catch(next);
  })
;
