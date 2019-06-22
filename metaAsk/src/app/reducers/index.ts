import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from "@ngrx/store";
import * as fromQuestion from "./question.reducer";

export const reducers: ActionReducerMap<any> = {
  question: fromQuestion.questionReducer
};

export const selectQuestionState = createFeatureSelector<fromQuestion.State>(
  "question"
);

export const {
  selectAll: selectAllQuestions
} = fromQuestion.questionAdapter.getSelectors(selectQuestionState);
