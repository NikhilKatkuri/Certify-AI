import FormatChallenge from '@/controllers/challenge/format';
import express from 'express';

const challengeRouter: express.Router = express.Router();

challengeRouter.post('/data', FormatChallenge);

challengeRouter.get('/', (_req: express.Request, res: express.Response) => {
  res.status(200).json({ message: 'Challenge route is working!' });
});

export default challengeRouter;
