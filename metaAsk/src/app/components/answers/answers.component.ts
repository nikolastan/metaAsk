import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Answer } from "src/app/models/answer.model";
import { Store } from "@ngrx/store";
import * as AnswerActions from "../../actions/answerActions";
import { selectAllAnswers, State } from "src/app/reducers/";
import { map } from "rxjs/operators";
import { selectAuthState } from "src/app/reducers";
import { AuthState } from "src/app/reducers/auth-reducer";

@Component({
  selector: "app-answers",
  templateUrl: "./answers.component.html",
  styleUrls: ["./answers.component.css"]
})
export class AnswersComponent implements OnInit {
  @Input()
  questionId: string;
  @Input()
  questionUser: string;
  answers$: Observable<Answer[]>;

  authState: Observable<AuthState>;
  @Input()
  isAuthenticated: false;
  @Input()
  user = null;

  constructor(private store: Store<State>) {
    this.authState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.answers$ = this.store.select(selectAllAnswers);
    this.store.dispatch(new AnswerActions.LoadAnswers(this.questionId));
  }

  ngOnChanges() {
    this.authState.subscribe(state => {
      this.user = state.user;
    });
    console.log(this.questionUser);
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
      .subscribe(answer => {
        if (answer != null) prevBest = answer[0];
      });

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
    this.store.dispatch(new AnswerActions.MarkBestAnswer(payload));
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
