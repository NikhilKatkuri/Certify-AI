import { UploadCourse } from '@/controllers/data_set/course';
import { UploadStudent } from '@/controllers/data_set/student';
import { UploadUniversity } from '@/controllers/data_set/university';
import express from 'express';

const dataSetRouter: express.Router = express.Router();

dataSetRouter.post('/upload/student', UploadStudent);
dataSetRouter.post('/upload/university', UploadUniversity);
dataSetRouter.post('/upload/course', UploadCourse);

dataSetRouter.get('/', (_req, res) => {
  // Handle fetching list of data sets here
  res.status(200).json({
    message: 'data sets',
  });
});

export default dataSetRouter;
