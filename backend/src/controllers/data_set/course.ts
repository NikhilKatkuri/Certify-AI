import { Request, Response } from 'express';
import { Course } from '@shared/dist';
import { CourseModel } from '@/schemas/data_set';

const UploadCourse = async (req: Request, res: Response) => {
  const { data } = req.body as { data: Course };
  if (!data) {
    res.status(400).json({ error: 'Data is required' });
    return;
  }

  const newCourse = new CourseModel(data);
  await newCourse.save();

  res.status(201).json({ message: 'Course uploaded successfully' });
};

export { UploadCourse };
