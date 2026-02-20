import { CourseModel } from '@/schemas/data_set';
import { Request, Response } from 'express';

const findCourse = async (req: Request, res: Response) => {
  const { uid, sid, courseName } = req.body as {
    uid: string;
    sid: string;
    courseName: string;
  };

  const foundCourse = await CourseModel.findOne({
    uid: uid,
    sid: sid,
    course_name: (function (courseName: string) {
      return new RegExp(courseName, 'i'); // Case-insensitive regex match
    })(courseName),
  });

  if (foundCourse) {
    return res.status(200).json({
      exists: true,
      course: foundCourse,
    });
  } else {
    return res.status(404).json({
      exists: false,
      course: null,
    });
  }
};

export default findCourse;
