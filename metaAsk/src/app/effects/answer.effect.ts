import { Injectable } from "@angular/core";

import { Effect, Actions, ofType } from "@ngrx/effects";
import { switchMap, map, concatMap } from "rxjs/operators";

import * as AnswerActions from "../actions/answerActions";
import * as FromServices from "../services/answer.service";
import { forkJoin } from "rxjs";

@Injectable()
export class AnswerEffects {
  constructor(
    private actions$: Actions,
    private answerService: FromServices.AnswerService
  ) {}

  @Effect()
  addAnswer$ = this.actions$.pipe(
    ofType<AnswerActions.AddAnswer>(AnswerActions.ADD_ANSWER),
    switchMap(action => {
      return this.answerService
        .addAnswer(action.payload)
        .pipe(map(answer => new AnswerActions.LoadAnswers(answer.questionId)));
    })
  );

  @Effect()
  markAnswer$ = this.actions$.pipe(
    ofType<AnswerActions.MarkBestAnswer>(AnswerActions.MARK_BEST_ANSWER),
    switchMap(action => {
      if (action.payload.prev != undefined)
        return forkJoin(
          this.answerService.updateAnswer(action.payload.prev),
          this.answerService.updateAnswer(action.payload.next)
        ).pipe(
          map(
            answers =>
              new AnswerActions.UpdateAnswers(
                answers.map(answer => {
                  return {
                    id: answer.id,
                    changes: {
                      answer: answer.answer,
                      bestAnswer: answer.bestAnswer,
                      questionId: answer.questionId
                    }
                  };
                })
              )
          )
        );
      else
        return this.answerService.updateAnswer(action.payload.next).pipe(
          map(answer => {
            const payload = {
              id: answer.id,
              changes: {
                answer: answer.answer,
                bestAnswer: answer.bestAnswer,
                questionId: answer.questionId
              }
            };
            return new AnswerActions.UpdateAnswer(payload);
          })
        );
    })
  );

  @Effect()
  loadAnswers$ = this.actions$.pipe(
    ofType<AnswerActions.LoadAnswers>(AnswerActions.LOAD_ANSWERS),
    concatMap(action => {
      return this.answerService
        .getAnswers(action.questionId)
        .pipe(
          map(
            answers =>
              new AnswerActions.LoadAnswersSuccess(answers, action.questionId)
          )
        );
    })
  );
}
