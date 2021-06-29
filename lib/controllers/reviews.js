import { Router } from 'express';
import Review from '../models/Review.js';
import Film from '../models/Film.js';

export default Router()
  .post('/reviews', (req, res, next) => {
    Review.create(req.body)
      .then(review => res.send(review))
      .catch(next);
  })

  .get('/reviews', (req, res, next) => {
    Review.findAll({
      attributes: ['id', 'review', 'rating', 'createdAt', 'updatedAt'],
      include: {
        model: Film,
        as: 'film',
        attributes: ['id', 'title']
      }
    })
      .then(reviews => res.send(reviews))
      .catch(next);
  })

  .delete('/reviews/:id', (req, res, next) => {
    Review.destroy({
      where: { id: req.params.id }
    })
      .then(([, reviewer]) => res.send(reviewer[0]))
      .catch(next);
  })
;
