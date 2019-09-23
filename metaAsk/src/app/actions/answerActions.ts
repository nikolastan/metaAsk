import { Action } from "@ngrx/store";
import { Answer } from "../models/answer.model";
import { Update } from "@ngrx/entity";

export const ADD_ANSWER = "[ANSWER] Add";
export const ADD_ANSWER_SUCCESS = "[ANSWER] Add_Success";
export const LOAD_ANSWERS = "[ANSWERS] Load";
export const LOAD_ANSWERS_SUCCESS = "[ANSWERS] Load_Success";
export const MARK_BEST_ANSWER = "[ANSWER] Mark_Best";
export const UPDATE_ANSWER = "[ANSWER] Update";
export const UPDATE_ANSWERS = "[ANSWERS] Update";
export const UPDATE_ANSWERS_SUCCESS = "[ANSWERS] Update_Success";

export class AddAnswer implements Action {
  readonly type = ADD_ANSWER;

  constructor(public payload: { answer; questionId; id }) {}
}

export class AddAnswerSuccess implements Action {
  readonly type = ADD_ANSWER_SUCCESS;
}

export class LoadAnswers implements Action {
  readonly type = LOAD_ANSWERS;

  constructor(public questionId: string) {}
}

export class LoadAnswersSuccess implements Action {
  readonly type = LOAD_ANSWERS_SUCCESS;

  constructor(public payload: Answer[], public questionId: string) {}
}

export class UpdateAnswers implements Action {
  readonly type = UPDATE_ANSWERS;

  constructor(public payload: Update<Answer>[]) {}
}

export class MarkBestAnswer implements Action {
  readonly type = MARK_BEST_ANSWER;

  constructor(public payload: { prev: Answer; next: Answer }) {}
}

export class UpdateAnswer implements Action {
  readonly type = UPDATE_ANSWER;

  constructor(public payload: Update<Answer>) {}
}

export type AnswerActions =
  | LoadAnswers
  | LoadAnswersSuccess
  | MarkBestAnswer
  | UpdateAnswer
  | UpdateAnswers;
