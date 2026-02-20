import { Schema, model } from 'mongoose';
import type { University, Student, Course } from '@certify-ai/db-types';

// University Schema
const universitySchema = new Schema<University>(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    recognizedName: {
      type: String,
      required: true,
    },
    recognizedByGov: {
      type: Boolean,
      required: true,
      default: false,
    },
    courseUids: {
      type: [String],
      default: [],
      index: true,
    },
    studentUids: {
      type: [String],
      default: [],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Student Schema
const studentSchema = new Schema<Student>(
  {
    sid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    uid: {
      type: String,
      required: true,
      index: true,
      ref: 'University',
    },
    name: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
      index: true,
    },
    enrolledCourseUids: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Course Schema
const courseSchema = new Schema<Course>(
  {
    cid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    uid: {
      type: String,
      required: true,
      index: true,
      ref: 'University',
    },
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export models
export const UniversityModel = model<University>(
  'University',
  universitySchema
);
export const StudentModel = model<Student>('Student', studentSchema);
export const CourseModel = model<Course>('Course', courseSchema);

// Export schemas for reference
export { universitySchema, studentSchema, courseSchema };
