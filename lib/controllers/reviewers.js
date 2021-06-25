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
  })
  
  .put('/reviewers/:id', (req, res, next) => {
    Reviewer.update(req.body, {
      where: { id: req.params.id },
      returning: true
    })
      .then(([, reviewer]) => res.send(reviewer[0]))
      .catch(next);
  })
  
  .delete('/reviewers/:id', (req, res, next) => {
    Reviewer.destroy({
      where: { id: req.params.id },
      returning: true
    })
      .then(([, reviewer]) => res.send(reviewer[0]))
      .catch(next);
  });

