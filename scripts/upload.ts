import { readFileSync } from "fs";
import { join } from "path";

const BASE_URL = "http://localhost:4000/data_set";

async function uploadData(
  endpoint: string,
  data: any,
  label: string,
): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;

  for (const item of data) {
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: item }),
      });

      if (!res.ok) {
        console.error(
          `✗ ${label} failed:`,
          item.cid || item.sid || item.uid,
          res.status,
          res.statusText,
        );
        failed++;
        continue;
      }

      await res.json();
      success++;
      if (success % 10 === 0) {
        console.log(`  ✓ ${success} ${label}s uploaded...`);
      }
    } catch (err) {
      console.error(`✗ ${label} error:`, item.cid || item.sid || item.uid, err);
      failed++;
    }
  }

  return { success, failed };
}

async function uploadAll() {
  console.log("📤 Starting upload to database...\n");

  // 1. Upload universities first
  console.log("1️⃣  Uploading universities...");
  const universitiesPath = join(__dirname, "universities.json");
  const universities = JSON.parse(readFileSync(universitiesPath, "utf-8"));
  const uniResults = await uploadData(
    "/upload/university",
    universities,
    "University",
  );
  console.log(
    `✓ Universities: ${uniResults.success} success, ${uniResults.failed} failed\n`,
  );

  // 2. Upload courses
  console.log("2️⃣  Uploading courses...");
  const coursesPath = join(__dirname, "courses.json");
  const courses = JSON.parse(readFileSync(coursesPath, "utf-8"));
  const courseResults = await uploadData("/upload/course", courses, "Course");
  console.log(
    `✓ Courses: ${courseResults.success} success, ${courseResults.failed} failed\n`,
  );

  // 3. Upload students
  console.log("3️⃣  Uploading students...");
  const studentsPath = join(__dirname, "students.json");
  const students = JSON.parse(readFileSync(studentsPath, "utf-8"));
  const studentResults = await uploadData(
    "/upload/student",
    students,
    "Student",
  );
  console.log(
    `✓ Students: ${studentResults.success} success, ${studentResults.failed} failed\n`,
  );

  // Summary
  console.log("=".repeat(50));
  console.log("📊 Upload Summary:");
  console.log(`  Universities: ${uniResults.success}/${universities.length}`);
  console.log(`  Courses: ${courseResults.success}/${courses.length}`);
  console.log(`  Students: ${studentResults.success}/${students.length}`);
  console.log("=".repeat(50));
}

uploadAll().catch(console.error);
