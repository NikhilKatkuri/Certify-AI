import { StudentModel } from '@/schemas/data_set';
import { Request, Response } from 'express';

const findStudent = async (req: Request, res: Response) => {
  const { uid, name } = req.body as {
    uid: string;
    name: string;
  };

  const foundStudent = await StudentModel.findOne({
    uid: uid,
    name: name,
  });

  if (foundStudent) {
    return res.status(200).json({
      message: 'Student found',
      exists: true,
      student: {
        sid: foundStudent.sid,
        uid: foundStudent.uid,
        name: foundStudent.name,
        rollNumber: foundStudent.rollNumber,
        enrolledCourseUids: foundStudent.enrolledCourseUids,
      },
    });
  } else {
    return res.status(404).json({
      message: 'Student not found',
      exists: false,
      student: null,
    });
  }
};

export default findStudent;
