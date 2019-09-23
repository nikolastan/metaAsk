import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Question } from "../models/question.model";
import { Answer } from "../models/answer.model";
import { map, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>("http://localhost:3000/questions");
  }

  getAnswers(questionId: string): Observable<Answer[]> {
    return this.http.get<Answer[]>(
      `http://localhost:3000/answers/?questionId=${questionId}`
    );
  }

  addQuestion(payload: any): Observable<Question> {
    const question: Question = new Question(
      payload.email,
      payload.title,
      payload.content,
      payload.id
    );
    return this.http.post<Question>(
      "http://localhost:3000/questions",
      question
    );
  }

  updateAnswer(payload: any): Observable<Answer> {
    const answer: Answer = new Answer(
      payload.questionId,
      payload.answer,
      payload.id,
      payload.bestAnswer
    );
    return this.http.put<Answer>(
      `http://localhost:3000/answers/${answer.id}`,
      answer
    );
  }

  addAnswer(payload: any): Observable<Answer> {
    const answer: Answer = new Answer(
      payload.questionId,
      payload.answer,
      payload.id,
      payload.bestAnswer
    );
    return this.http.post<Answer>("http://localhost:3000/answers", answer);
  }
}
