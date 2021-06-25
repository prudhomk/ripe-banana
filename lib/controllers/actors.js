import { Router } from 'express';
import Actor from '../models/Actor.js';

export default Router()
  .post('/actors', (req, res, next) => {
    Actor.create(req.body)
      .then(actor => res.send(actor))
      .catch(next)
    ;
  })
;
