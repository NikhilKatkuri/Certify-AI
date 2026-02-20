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

  enrolledCourseUids: string[];
}

interface Student {
  sid: string;
  uid: string; // belongs to which university

  name: string;
  rollNumber: string;

  enrolledCourseUids: string[];
}

export type { University, Student };
