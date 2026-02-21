import { Request, Response } from 'express';
import { UniversityModel } from '@/schemas/data_set';

const findUniversity = async (req: Request, res: Response) => {
  const { input } = req.body as { input: string };

  const foundUniversities = await UniversityModel.findOne({
    $expr: {
      $regexMatch: {
        input: input, // The long string from the user
        regex: '$recognizedName', // The short string in your DB
        options: 'i',
      },
    },
  });

  if (foundUniversities) {
    return res.status(200).json({
      message: 'University found',
      exists: true,
      university: {
        uid: foundUniversities.uid,
        name: foundUniversities.name,
        recognizedByGov: foundUniversities.recognizedByGov,
        courseUids: foundUniversities.courseUids,
        studentUids: foundUniversities.studentUids,
      },
    });
  } else {
    return res.status(404).json({
      message: 'University not found',
      exists: false,
      university: null,
    });
  }
};

export default findUniversity;
