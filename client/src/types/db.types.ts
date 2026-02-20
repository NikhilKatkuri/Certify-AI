interface University {
  uid: string;

  name: string;
  recognizedName: string;
  recognizedByGov: boolean;

  courseUids: string[];
  studentUids: string[];
}

interface Student {
  sid: string;
  uid: string; // belongs to which university

  name: string;
  rollNumber: string;

  enrolledCourseUids: {
    courseUid: string;
    name: string;
  }[];
}

interface Course {
  cid: string;
  uid: string; // which university offers this

  name: string;
  duration?: string;
}

export type { University, Student, Course };
