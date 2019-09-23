import { createEntityAdapter, EntityState, EntityAdapter } from "@ngrx/entity";
import * as Actions from "../actions/answerActions";
import { Answer } from "../models/answer.model";
import { AppState } from "../app.state";

export interface AnswerState extends EntityState<Answer> {}

export const answerAdapter: EntityAdapter<Answer> = createEntityAdapter<
  Answer
>();

export const answerInitialState: AnswerState = answerAdapter.getInitialState();

export function AnswerReducer(
  state: AnswerState = answerInitialState,
  action: Actions.AnswerActions
): AnswerState {
  switch (action.type) {
    case Actions.LOAD_ANSWERS_SUCCESS:
      return answerAdapter.addMany(action.payload, state);
    case Actions.UPDATE_ANSWERS:
      return answerAdapter.updateMany(action.payload, state);
    case Actions.UPDATE_ANSWER:
      return answerAdapter.updateOne(action.payload, state);
    default:
      return state;
  }
}

export const selectAnswerState = (state: AppState) => state.answers;

export const { selectAll: selectAllAnswers } = answerAdapter.getSelectors();
