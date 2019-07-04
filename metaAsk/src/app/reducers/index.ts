import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from "@ngrx/store";
import * as Reducers from "./reducer";
import { AppState } from "../app.state";

export interface State {
  state: AppState;
}

export const reducers: ActionReducerMap<State> = {
  state: Reducers.Reducer
};

export const selectStateModule = createFeatureSelector<AppState>("state");

export const selectQuestionState = createSelector(
  selectStateModule,
  Reducers.selectQuestionState
);
export const selectAnswerState = createSelector(
  selectStateModule,
  Reducers.selectAnswerState
);

export const selectAllQuestions = createSelector(
  selectQuestionState,
  Reducers.selectAllQuestions
);
export const selectAllAnswers = createSelector(
  selectAnswerState,
  Reducers.selectAllAnswers
);
