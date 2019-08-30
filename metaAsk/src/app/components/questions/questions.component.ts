import { Component, OnInit, Input } from "@angular/core";

import { Store } from "@ngrx/store";
import { Question } from "src/app/models/question.model";
import { AppState } from "src/app/app.state";
import { Observable } from "rxjs";
import { selectAllQuestions, State } from "src/app/reducers";
import * as QuestionActions from "../../actions/actions";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"]
})
export class QuestionsComponent implements OnInit {
  questions$: Observable<Question[]>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.questions$ = this.store.select(selectAllQuestions);
    this.store.dispatch(new QuestionActions.LoadQuestions());
  }
}
