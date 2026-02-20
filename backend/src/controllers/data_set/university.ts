import { Request, Response } from 'express';
import { University } from '@shared/dist';
import { UniversityModel } from '@/schemas/data_set';

const UploadUniversity = async (req: Request, res: Response) => {
  const { data } = req.body as { data: University };
  if (!data) {
    res.status(400).json({ error: 'Data is required' });
    return;
  }

  const u_uid = await UniversityModel.findOne({ uid: data.uid });
  if (u_uid) {
    res.status(400).json({ error: 'University with this UID already exists' });
    return;
  }

  const newUniversity = new UniversityModel(data);
  await newUniversity.save();
  res.status(201).json({ message: 'University uploaded successfully' });
};

const ReadUniversity = async (req: Request, res: Response) => {
  const { uid } = req.body as { uid: string };
  if (!uid) {
    res.status(400).json({ error: 'UID is required' });
    return;
  }

  const u_uid = await UniversityModel.findOne({ uid });
  if (!u_uid) {
    res
      .status(404)
      .json({ error: 'University not found', university: null, exist: false });
    return;
  }

  res
    .status(200)
    .json({ message: 'University found', university: u_uid, exist: true });
};

export { UploadUniversity, ReadUniversity };
