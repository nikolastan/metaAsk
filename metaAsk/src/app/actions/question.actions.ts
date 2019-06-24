import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Question } from "./../models/question.model";

export const ADD_QUESTION = "[QUESTION] Add";
export const ADD_QUESTION_SUCCESS = "[QUESTION] Add_Success";
export const REMOVE_QUESTION = "[QUESTION] Remove";
export const LOAD_QUESTIONS = "[QUESTIONS] Load";
export const LOAD_QUESTIONS_SUCCESS = "[QUESTIONS] Load_Success";

export class AddQuestion implements Action {
  readonly type = ADD_QUESTION;

  constructor(public payload: { name; title; content; id }) {}
}

export class RemoveQuestion implements Action {
  readonly type = REMOVE_QUESTION;

  constructor(public payload: number) {}
}

export class LoadQuestions implements Action {
  readonly type = LOAD_QUESTIONS;

  constructor() {}
}

export class LoadQuestionsSuccess implements Action {
  readonly type = LOAD_QUESTIONS_SUCCESS;

  constructor(public payload: Question[]) {}
}

export type Actions =
  | AddQuestion
  | RemoveQuestion
  | LoadQuestions
  | LoadQuestionsSuccess;
