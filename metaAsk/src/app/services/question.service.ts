import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Question } from "../models/question.model";

@Injectable({
  providedIn: "root"
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>("http://localhost:3000/questions");
  }

  addQuestion(payload: any): Observable<Question> {
    const question: Question = new Question(
      payload.name,
      payload.title,
      payload.content,
      payload.id
    );
    return this.http.post<Question>(
      "http://localhost:3000/questions",
      question
    );
  }
}
