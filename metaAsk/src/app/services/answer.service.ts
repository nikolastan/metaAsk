import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Answer } from "../models/answer.model";

@Injectable({
  providedIn: "root"
})
export class AnswerService {
  constructor(private http: HttpClient) {}

  getAnswers(questionId: string): Observable<Answer[]> {
    return this.http.get<Answer[]>(
      `http://localhost:3000/answers/?questionId=${questionId}`
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
