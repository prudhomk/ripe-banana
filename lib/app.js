import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import studioHandler from './controllers/studios.js';
import actorHandler from './controllers/actors.js';
import reviewerHandler from './controllers/reviewers.js';

const app = express();

app.use(express.json());

app.use('/api/v1', studioHandler);
app.use('/api/v1', actorHandler);
app.use('/api/v1', reviewerHandler);

app.use(notFoundMiddleware);
app.use(errorMiddleware); 

export default app;
