import { Injectable } from "@angular/core";

import { Effect, Actions, ofType } from "@ngrx/effects";
import { switchMap, map, take, concatMap, mergeMap } from "rxjs/operators";

import * as QuestionActions from "../actions/questionActions";
import * as FromServices from "../services/question.service";

@Injectable()
export class QuestionEffects {
  constructor(
    private actions$: Actions,
    private questionService: FromServices.QuestionService
  ) {}

  @Effect()
  loadQuestions$ = this.actions$.pipe(
    ofType<QuestionActions.LoadQuestions>(QuestionActions.LOAD_QUESTIONS),
    switchMap(() => {
      return this.questionService
        .getQuestions()
        .pipe(
          map(questions => new QuestionActions.LoadQuestionsSuccess(questions))
        );
    })
  );

  @Effect()
  addQuestion$ = this.actions$.pipe(
    ofType<QuestionActions.AddQuestion>(QuestionActions.ADD_QUESTION),
    switchMap(action => {
      return this.questionService
        .addQuestion(action.payload)
        .pipe(map(() => new QuestionActions.LoadQuestions()));
    })
  );
}
