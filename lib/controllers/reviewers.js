import { Router } from 'express';
import Reviewer from '../models/Reviewer.js';

export default Router()
  .post('/reviewers', (req, res, next) => {
    Reviewer.create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  .get('/reviewers', (req, res, next) => {
    Reviewer.findAll()
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })
  .get('/reviewers/:id', (req, res, next) => {
    Reviewer.findByPk(req.params.id)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });

