import findCourse from '@/controllers/challenge/findCourse';
import findStudent from '@/controllers/challenge/findStudent';
import findUniversity from '@/controllers/challenge/findUniversity';
import FormatChallenge from '@/controllers/challenge/format';
import ErrorHandler from '@/helpers/error';
import express from 'express';

const challengeRouter: express.Router = express.Router();

challengeRouter.post('/data', ErrorHandler(FormatChallenge));
challengeRouter.post('/data/university', ErrorHandler(findUniversity));
challengeRouter.post('/data/student', ErrorHandler(findStudent));
challengeRouter.post('/data/course', ErrorHandler(findCourse));

challengeRouter.get('/', (_req: express.Request, res: express.Response) => {
  res.status(200).json({ message: 'Challenge route is working!' });
});

export default challengeRouter;
