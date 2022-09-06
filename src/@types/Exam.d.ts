interface Exam {
  examId: number;
  firstScienceCount: number;
  secondScienceCount: number;
  type: "grand" | "contract" | not;
  direction: Direction;
  user: User;
  createAt: string;
}
