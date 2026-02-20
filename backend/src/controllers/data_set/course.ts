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

const ReadCourse = async (req: Request, res: Response) => {
  const { uid, cid } = req.body as { uid: string; cid: string };
  if (!uid) {
    res.status(400).json({ error: 'UID is required' });
    return;
  }

  if (!cid) {
    res.status(400).json({ error: 'CID is required' });
    return;
  }

  const course = await CourseModel.findOne({ uid, cid });

  if (!course) {
    res
      .status(404)
      .json({ error: 'Course not found', course: null, exist: false });
    return;
  }
  res.status(200).json({ message: 'Course found', course, exist: true });
};

export { UploadCourse, ReadCourse };
