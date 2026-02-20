import { writeFileSync } from "fs";
import { join } from "path";

const courses = ["aiml", "cse", "ece", "mech", "csd", "csm"];
const courseUniversities = ["HITM", "HITK", "IARE"];
const courseIds = ["CM101", "CS102", "EC103", "ME104", "CS105", "CSM106"];

const startDate = new Date("2024-01-01").toISOString().split("T")[0];
const endDate = new Date("2024-12-31").toISOString().split("T")[0];

async function fromCourses() {
  const coursesData = [];

  for (const university of courseUniversities) {
    for (let index = 0; index < courses.length; index++) {
      const course = courses[index];

      const random4 = Math.floor(1000 + Math.random() * 9000);

      const object = {
        name: course.toUpperCase(),
        duration: `${startDate}::${endDate}`,
        cid: `${courseIds[index]}_${university}_${random4}`,
        uid: `U_${university}`,
      };

      coursesData.push(object);
    }
  }

  const outputPath = join(__dirname, "courses.json");
  writeFileSync(outputPath, JSON.stringify(coursesData, null, 2), "utf-8");
  console.log(`✓ Wrote ${coursesData.length} courses to ${outputPath}`);
}

fromCourses();
