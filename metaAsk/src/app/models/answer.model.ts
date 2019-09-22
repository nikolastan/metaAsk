export class Answer {
  questionId: string;
  answer: string;
  id: string;
  bestAnswer: boolean;

  constructor(questionId, answer, id, bestAnswer) {
    this.questionId = questionId;
    this.answer = answer;
    this.id = id;
    this.bestAnswer = bestAnswer;
  }
}
