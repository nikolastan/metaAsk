import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Question } from "./../models/question.model";

export const ADD_QUESTION = "[QUESTION] Add";
export const REMOVE_QUESTION = "[QUESTION] Remove";

export class AddQuestion implements Action {
  readonly type = ADD_QUESTION;

  constructor(public payload: Question) {}
}

export class RemoveQuestion implements Action {
  readonly type = REMOVE_QUESTION;

  constructor(public payload: number) {}
}

export type Actions = AddQuestion | RemoveQuestion;
