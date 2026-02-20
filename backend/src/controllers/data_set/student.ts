import { Request, Response } from 'express';
import { Student } from '@shared/dist';
import { StudentModel } from '@/schemas/data_set';

const UploadStudent = async (req: Request, res: Response) => {
  const { data } = req.body as { data: Student };
  if (!data) {
    res.status(400).json({ error: 'Data is required' });
    return;
  }

  const newStudent = new StudentModel(data);
  await newStudent.save();

  res.status(201).json({ message: 'Student uploaded successfully' });
};

export { UploadStudent };
