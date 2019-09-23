import { Component, OnInit, Input } from "@angular/core";

import { Store } from "@ngrx/store";
import { Question } from "src/app/models/question.model";
import { Observable } from "rxjs";
import { selectAllQuestions, State } from "src/app/reducers";
import * as QuestionActions from "../../actions/questionActions";
import { selectAuthState } from "src/app/reducers";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"]
})
export class QuestionsComponent implements OnInit {
  questions$: Observable<Question[]>;

  authState: Observable<any>;
  @Input()
  isAuthenticated: false;
  user = null;

  constructor(private store: Store<State>) {
    this.authState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.questions$ = this.store.select(selectAllQuestions);
    this.store.dispatch(new QuestionActions.LoadQuestions());
  }

  ngOnChanges() {
    this.authState.subscribe(state => {
      this.user = state.user;
    });
  }
}
