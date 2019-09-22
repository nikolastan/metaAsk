import { Injectable } from "@angular/core";

import { Effect, Actions, ofType } from "@ngrx/effects";
import { switchMap, map, take, concatMap, mergeMap } from "rxjs/operators";

import * as QuestionActions from "../actions/actions";
import * as FromServices from "../services/question.service";
import { forkJoin } from "rxjs";

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

  @Effect()
  addAnswer$ = this.actions$.pipe(
    ofType<QuestionActions.AddAnswer>(QuestionActions.ADD_ANSWER),
    switchMap(action => {
      return this.questionService
        .addAnswer(action.payload)
        .pipe(
          map(answer => new QuestionActions.LoadAnswers(answer.questionId))
        );
    })
  );

  @Effect()
  updateAnswer$ = this.actions$.pipe(
    ofType<QuestionActions.UpdateAnswer>(QuestionActions.UPDATE_ANSWER),
    switchMap(action => {
      return this.questionService
        .updateAnswer(action.payload)
        .pipe(
          map(answer => new QuestionActions.LoadAnswers(answer.questionId))
        );
    })
  );

  @Effect()
  markAnswer$ = this.actions$.pipe(
    ofType<QuestionActions.MarkBestAnswer>(QuestionActions.MARK_BEST_ANSWER),
    switchMap(action => {
      return forkJoin(
        this.questionService.updateAnswer(action.payload.prev),
        this.questionService.updateAnswer(action.payload.next)
      ).pipe(
        map(
          answers =>
            new QuestionActions.UpdateAnswers(
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
    })
  );

  @Effect()
  loadAnswers$ = this.actions$.pipe(
    ofType<QuestionActions.LoadAnswers>(QuestionActions.LOAD_ANSWERS),
    concatMap(action => {
      return this.questionService
        .getAnswers(action.questionId)
        .pipe(
          map(
            answers =>
              new QuestionActions.LoadAnswersSuccess(answers, action.questionId)
          )
        );
    })
  );
}
