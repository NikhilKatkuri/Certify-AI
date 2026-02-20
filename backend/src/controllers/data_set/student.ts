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

const ReadStudent = async (req: Request, res: Response) => {
  const { uid, sid } = req.body as { uid: string; sid: string };
  if (!uid) {
    res.status(400).json({ error: 'UID is required' });
    return;
  }
  if (!sid) {
    res.status(400).json({ error: 'SID is required' });
    return;
  }

  const student = await StudentModel.findOne({ uid, sid });
  if (!student) {
    res
      .status(404)
      .json({ error: 'Student not found', student: null, exist: false });
    return;
  }

  res.status(200).json({ message: 'Student found', student, exist: true });
};

export { UploadStudent, ReadStudent };
