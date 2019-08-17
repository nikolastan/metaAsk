export class Answer {
  questionId: string;
  answer: string;
  id: string;

  constructor(questionId, answer, id) {
    this.questionId = questionId;
    this.answer = answer;
    this.id = id;
  }
}
