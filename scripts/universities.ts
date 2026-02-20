import { writeFileSync, readFileSync } from "fs";
import { join } from "path";

const universitiess = ["HITM", "HITK", "IARE"];
const names = [
  "Hyderabad Institute of Technology and Management",
  "Hyderabad Institute of Technology and knowledge",
  "Institute of Aeronautical Engineering",
];
const recognizedByGov = [true, false, true];

async function uni() {
  // Read courses.json
  const coursesPath = join(__dirname, "courses.json");
  const coursesData = JSON.parse(readFileSync(coursesPath, "utf-8"));

  // Read students.json
  const studentsPath = join(__dirname, "students.json");
  const studentsData = JSON.parse(readFileSync(studentsPath, "utf-8"));

  const data = [];
  for (const university of universitiess) {
    const universityUid = `U_${university}`;

    // Filter courses for this university
    const universityCourses = coursesData
      .filter((course: any) => course.uid === universityUid)
      .map((course: any) => course.cid);

    // Filter students for this university
    const universityStudents = studentsData
      .filter((student: any) => student.uid === universityUid)
      .map((student: any) => student.sid);

    const object = {
      uid: universityUid,
      name: university,
      recognizedName: names[universitiess.indexOf(university)],
      recognizedByGov: recognizedByGov[universitiess.indexOf(university)],
      courseUids: universityCourses,
      studentUids: universityStudents,
    };

    data.push(object);
  }
  const outputPath = join(__dirname, "universities.json");
  writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`✓ Wrote ${data.length} universities to ${outputPath}`);
}

uni();
