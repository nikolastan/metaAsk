import { createEntityAdapter, EntityState, EntityAdapter } from "@ngrx/entity";
import * as QuestionActions from "../actions/question.actions";
import { Question } from "../models/question.model";

export interface State extends EntityState<Question> {}

export const questionAdapter: EntityAdapter<Question> = createEntityAdapter<
  Question
>();

export const initialState: State = questionAdapter.getInitialState();

export function questionReducer(
  state: State = initialState,
  action: QuestionActions.Actions
) {
  switch (action.type) {
    case QuestionActions.ADD_QUESTION: {
      const question: Question = new Question(
        action.payload.name,
        action.payload.title,
        action.payload.content,
        action.payload.id
      );
      return questionAdapter.addOne(question, state);
    }
    case QuestionActions.REMOVE_QUESTION:
      return questionAdapter.removeOne(action.payload, state);
    default:
      return state;
  }
}
