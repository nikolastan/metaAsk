import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Answer } from "src/app/models/answer.model";
import { Store, createSelector, select } from "@ngrx/store";
import * as QuestionActions from "../../actions/actions";
import { selectAllAnswers } from "src/app/reducers/";
import { State } from "src/app/reducers";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-answers",
  templateUrl: "./answers.component.html",
  styleUrls: ["./answers.component.css"]
})
export class AnswersComponent implements OnInit {
  @Input()
  questionId: string;
  answers$: Observable<Answer[]>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.answers$ = this.store.select(selectAllAnswers);
    this.store.dispatch(new QuestionActions.LoadAnswers(this.questionId));
  }

  answersForQuestion() {
    return this.answers$.pipe(
      map(answers => {
        answers = answers.filter(
          answer => answer.questionId == this.questionId
        );
        if (answers == undefined || answers.length == 0) {
          return false;
        } else return answers;
      })
    );
  }
}
