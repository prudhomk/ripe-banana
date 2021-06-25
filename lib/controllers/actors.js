import { Router } from 'express';
import Actor from '../models/Actor.js';

export default Router()
  .post('/actors', (req, res, next) => {
    Actor.create(req.body)
      .then(actor => res.send(actor))
      .catch(next)
    ;
  })
  .get('/actors/:id', (req, res, next) => {
    Actor.findByPk(req.params.id)
      .then(actor => res.send(actor))
      .catch(next)
    ;
  })
  .get('/actors', (req, res, next) => {
    Actor.findAll()
      .then(actors => res.send(actors))
      .catch(next)
    ;
  })
;
