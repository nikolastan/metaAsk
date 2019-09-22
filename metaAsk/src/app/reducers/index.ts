import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from "@ngrx/store";
import * as QuestionReducer from "./question-reducer";
import * as AnswerReducer from "./answer-reducer";
import * as AuthReducer from "./auth-reducer";
import { AppState } from "../app.state";

export const initialState = {
  questions: QuestionReducer.questionInitialState,
  answers: AnswerReducer.answerInitialState,
  auth: AuthReducer.authInitialState
};

export interface State extends AppState {
  questions: QuestionReducer.QuestionState;
  answers: AnswerReducer.AnswerState;
  auth: AuthReducer.AuthState;
}

export const reducers: ActionReducerMap<State> = {
  questions: QuestionReducer.QuestionReducer,
  answers: AnswerReducer.AnswerReducer,
  auth: AuthReducer.AuthReducer
};

export const selectStateModule = createFeatureSelector<State>("state");

export const selectQuestionState = createSelector(
  selectStateModule,
  QuestionReducer.selectQuestionState
);
export const selectAnswerState = createSelector(
  selectStateModule,
  AnswerReducer.selectAnswerState
);

export const selectAllQuestions = createSelector(
  selectQuestionState,
  QuestionReducer.selectAllQuestions
);
export const selectAllAnswers = createSelector(
  selectAnswerState,
  AnswerReducer.selectAllAnswers
);
