import { ReadCourse, UploadCourse } from '@/controllers/data_set/course';
import { ReadStudent, UploadStudent } from '@/controllers/data_set/student';
import {
  ReadUniversity,
  UploadUniversity,
} from '@/controllers/data_set/university';
import express from 'express';

const dataSetRouter: express.Router = express.Router();

dataSetRouter.post('/upload/student', UploadStudent);
dataSetRouter.post('/upload/university', UploadUniversity);
dataSetRouter.post('/upload/course', UploadCourse);

dataSetRouter.post('/read/university', ReadUniversity);
dataSetRouter.post('/read/student', ReadStudent);
dataSetRouter.post('/read/course', ReadCourse);

dataSetRouter.get('/', (_req, res) => {
  // Handle fetching list of data sets here
  res.status(200).json({
    message: 'data sets',
  });
});

export default dataSetRouter;
