import { writeFileSync, readFileSync } from "fs";
import { join } from "path";

const universities = ["HITM", "HITK", "IARE"];

const firstNames = [
  "Rohan",
  "Akhil",
  "Vikram",
  "Teja",
  "Arjun",
  "Sai",
  "Karthik",
  "Harsha",
  "Aditya",
  "Rahul",
  "Ananya",
  "Sravani",
  "Divya",
  "Sneha",
  "Nithya",
  "Priya",
  "Keerthi",
  "Aishwarya",
  "Meghana",
  "Pooja",
];

const lastNames = [
  "Reddy",
  "Kumar",
  "Naidu",
  "Sharma",
  "Varma",
  "Rao",
  "Patel",
  "Singh",
  "Chowdary",
  "Yadav",
  "Goud",
  "Mishra",
  "Joshi",
  "Kapoor",
  "Verma",
];

function getRandomName() {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${first} ${last}`;
}

const universityCode: Record<string, string> = {
  HITM: "M",
  HITK: "K",
  IARE: "I",
};

const universityIndex = Array.from(
  { length: universities.length },
  (_, i) => i + 1,
);

const uniVersityBranch = ["aiml", "cse", "ece", "mech", "csd", "csm"];

const RollIndexForBranch = [
  ...Array.from({ length: uniVersityBranch.length }, (_, i) => i + 1),
];

const rolls = [
  ...Array.from({ length: 4 }, (_, i) => {
    return `${20 + i}`;
  }),
];

const midfix = "51a6";

const rollIndex = [
  ...Array.from({ length: 5 }, (_, i) => {
    return `${i < 9 ? "0" + (i + 1) : i + 1}`;
  }),
];

async function stds() {
  // Read courses.json
  const coursesPath = join(__dirname, "courses.json");
  const coursesData = JSON.parse(readFileSync(coursesPath, "utf-8"));

  // Create a mapping: university + branch index -> course ID
  const courseMap: Record<string, string> = {};
  const branches = ["aiml", "cse", "ece", "mech", "csd", "csm"];

  for (const course of coursesData) {
    const branchName = course.name.toLowerCase();
    const branchIndex = branches.indexOf(branchName);
    const key = `${course.uid}_${branchIndex}`;
    courseMap[key] = course.cid;
  }

  const data = [];
  for (const u of universities) {
    for (let i = 1; i <= 4; i++) {
      for (const branch of uniVersityBranch) {
        for (const index of rollIndex) {
          const rollNumber = `${20 + i}${universityCode[u]}${midfix}${uniVersityBranch.indexOf(branch)}${index}`;

          // Extract branch index from roll number (character at position -3)
          const branchIndex = rollNumber[rollNumber.length - 3];
          const courseKey = `U_${u}_${branchIndex}`;
          const courseId = courseMap[courseKey] || null;

          const object = {
            uid: `U_${u}`,
            sid: rollNumber,
            rollNumber,
            name: getRandomName(),
            enrolledCourseUids: courseId ? [courseId] : [],
          };
          data.push(object);
        }
      }
    }
  }
  const outputPath = join(__dirname, "students.json");
  writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`✓ Wrote ${data.length} students to ${outputPath}`);
}

stds();
