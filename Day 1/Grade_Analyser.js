const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 92 },
  { name: "Charlie", score: 58 },
  { name: "David", score: 74 },
];

const avgMarks = () => {
  let sum = 0;

  for (let i = 0; i < students.length; i++) {
    sum = sum + students[i].score;
  }

  avg = sum / students.length;

  return avg;
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
    // if (students[i].score>=90 && students[i].score<=100){
    //     distribution.A++;
    // }
    // else if (students[i].score>=80 && students[i].score<=89){
    //     distribution.B++;
    // }
    // else if (students[i].score>=70 && students[i].score<=79){
    //     distribution.C++;
    // }
    // else if (students[i].score>=60 && students[i].score<=69){
    //     distribution.D++;
    // }
    // else if (students[i].score>=0 && students[i].score<60){
    //     distribution.F++
    // }
    // else{
    //     console.log("Error!");
    // }

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

const result = () => {
  const averageMarks = avgMarks();
  console.log(`Average Score : ${averageMarks}`);

  const maximumMarks = maxMarks();
  console.log(`Highest Score : ${maximumMarks.name} ${maximumMarks.max}`);

  const minimumMarks = minMarks();
  console.log(`Lowest Score : ${minimumMarks.name} ${minimumMarks.min}`);

  const gradeCount = gradeDistribution();
  console.log("Grade Distribution :", gradeCount);

  const examRetakers = retakeExam();
  console.log("Students needing retake :", examRetakers);
};

result();
