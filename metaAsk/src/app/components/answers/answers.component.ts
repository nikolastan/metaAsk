import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Answer } from "src/app/models/answer.model";
import { Store, createSelector, select } from "@ngrx/store";
import * as QuestionActions from "../../actions/actions";
import { selectAllAnswers } from "src/app/reducers/";
import { State } from "src/app/reducers";
import { map, filter, reduce } from "rxjs/operators";

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

  markBestAnswer(answerId) {
    const answers = this.answersForQuestion();
    var prevBest;
    var nextBest;
    answers
      .pipe(
        map(answers => {
          answers = answers.filter(answer => answer.bestAnswer == true);
          if (answers == undefined || answers.length == 0) {
            return null;
          } else return answers;
        })
      )
      .subscribe(answer => (prevBest = answer[0]));

    if (prevBest) {
      var answer = new Answer(
        prevBest.questionId,
        prevBest.answer,
        prevBest.id,
        false
      );
      prevBest = answer;
    } else prevBest = null;

    this.answerSpecific(answerId).subscribe(answer => (nextBest = answer[0]));
    answer = new Answer(
      nextBest.questionId,
      nextBest.answer,
      nextBest.id,
      true
    );
    nextBest = answer;
    const payload = {
      prev: prevBest,
      next: nextBest
    };
    this.store.dispatch(new QuestionActions.MarkBestAnswer(payload));
  }

  answerSpecific(answerId) {
    return this.answers$.pipe(
      map(answers => {
        answers = answers.filter(answer => answer.id == answerId);
        if (answers == undefined || answers.length == 0) {
          return null;
        } else return answers;
      })
    );
  }

  answersForQuestion() {
    return this.answers$.pipe(
      map(answers => {
        answers = answers.filter(
          answer => answer.questionId == this.questionId
        );
        if (answers == undefined || answers.length == 0) {
          return null;
        } else return answers;
      })
    );
  }

  isBestAnswer(answerId) {
    var bool;
    this.answerSpecific(answerId).subscribe(answer => {
      bool = answer[0].bestAnswer;
    });
    return bool;
  }
}
