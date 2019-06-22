import { Component, OnInit, Input } from "@angular/core";

import { UUID } from "angular2-uuid";
import { Store } from "@ngrx/store";
import * as QuestionActions from "../../actions/question.actions";
import { Question } from "src/app/models/question.model";
import { AppState } from "src/app/app.state";
import { Observable } from "rxjs";
import { selectAllQuestions } from "src/app/reducers";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"]
})
export class QuestionsComponent implements OnInit {
  questions$: Observable<Question[]>;
  @Input()
  name: string | "Anonymous";
  @Input()
  title: string;
  @Input()
  content: string;

  constructor(private store: Store<AppState>) {}

  generateUUID() {
    return UUID.UUID();
  }

  ngOnInit() {
    this.questions$ = this.store.select(selectAllQuestions);
  }

  addQuestion(name, title, content) {
    const question: Question = {
      name,
      title,
      content,
      id: this.generateUUID()
    };
    this.store.dispatch(new QuestionActions.AddQuestion(question));

    this.name = "";
    this.title = "";
    this.content = "";
  }

  removeQuestion(number) {
    this.store.dispatch(new QuestionActions.RemoveQuestion(number));
  }
}
