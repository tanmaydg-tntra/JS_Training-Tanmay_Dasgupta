const students = [
  { name: "Aarav", score: 85 },
  { name: "Vivaan", score: 92 },
  { name: "Aditya", score: 58 },
  { name: "Rohan", score: 74 },
  { name: "Priya", score: 67 },
  { name: "Kavya", score: 89 },
  { name: "Tanmay", score: 95 },
  { name: "Ishaan", score: 73 },
  { name: "Neha", score: 61 },
  { name: "Arjun", score: 78 },
  { name: "Sneha", score: 88 },
  { name: "Varun", score: 54 },
  { name: "Diya", score: 91 },
  { name: "Siddharth", score: 63 },
  { name: "Meera", score: 82 },
  { name: "Tanvi", score: 70 },
  { name: "Ananya", score: 96 },
  { name: "Ritika", score: 77 },
  { name: "Yash", score: 84 },
  { name: "Pooja", score: 69 },
];

const avgMarks = () => {
  let sum = 0;

  for (let i = 0; i < students.length; i++) {
    sum = sum + students[i].score;
  }

  return sum / students.length;
};

const maxMarks = () => {
  let max = 0;
  let name;

  for (let i = 0; i < students.length; i++) {
    if (students[i].score > max) {
      max = students[i].score;
      name = students[i].name;
    }
  }

  return { name, max };
};

const minMarks = () => {
  let min = 100;
  let name;

  for (let i = 0; i < students.length; i++) {
    if (students[i].score < min) {
      min = students[i].score;
      name = students[i].name;
    }
  }

  return { name, min };
};

const gradeDistribution = () => {
  let distribution = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0,
  };

  for (let i = 0; i < students.length; i++) {
    switch (true) {
      case students[i].score >= 90 && students[i].score <= 100:
        distribution.A++;
        break;
      case students[i].score >= 80 && students[i].score <= 89:
        distribution.B++;
        break;
      case students[i].score >= 70 && students[i].score <= 79:
        distribution.C++;
        break;
      case students[i].score >= 60 && students[i].score <= 69:
        distribution.D++;
        break;
      case students[i].score >= 0 && students[i].score <= 59:
        distribution.F++;
        break;
      default:
        console.log("The score entered is not proper");
    }
  }

  return distribution;
};

const retakeExam = () => {
  let retakeName = [];

  for (let i = 0; i < students.length; i++) {
    if (students[i].score < 60) {
      retakeName.push(students[i].name);
    }
  }
  return retakeName;
};

const getResult = () => {
  const averageMarks = avgMarks();
  const maximumMarks = maxMarks();
  const minimumMarks = minMarks();
  const gradeCount = gradeDistribution();
  const examRetakers = retakeExam();

  const summary = 
`Average Score: ${averageMarks}
Highest Score: ${maximumMarks.name} (${maximumMarks.max})
Lowest Score: ${minimumMarks.name} (${minimumMarks.min})`;

  return {
    summary,
    gradeDistribution: gradeCount,
    studentsNeedingRetake: examRetakers,
  };
};

const report = getResult();
console.log(report.summary);
console.log("Grade Distribution:", report.gradeDistribution);
console.log("Students needing retake:", report.studentsNeedingRetake);
