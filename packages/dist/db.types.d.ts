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
    uid: string;
    name: string;
    rollNumber: string;
    enrolledCourseUids: string[];
}
interface Course {
    cid: string;
    uid: string;
    name: string;
    duration?: string;
}
export type { University, Student, Course };
//# sourceMappingURL=db.types.d.ts.map