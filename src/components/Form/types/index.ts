export type FormValues = {
  teacherName: string;
  examName: string;
  class: string;
  totalScore: number;
  gender: string;
  chorak: number;

  countOfStudents: number;
  exercises: {
    title: string;
    score: string;
    width: number;
  }[];
};
