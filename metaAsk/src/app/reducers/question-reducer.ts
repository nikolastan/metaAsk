import { createEntityAdapter, EntityState, EntityAdapter } from "@ngrx/entity";
import * as Actions from "../actions/questionActions";
import { Question } from "../models/question.model";
import { AppState } from "../app.state";

export interface QuestionState extends EntityState<Question> {}

export const questionAdapter: EntityAdapter<Question> = createEntityAdapter<
  Question
>();

export const questionInitialState: QuestionState = questionAdapter.getInitialState();

export function QuestionReducer(
  state: QuestionState = questionInitialState,
  action: Actions.QuestionActions
): QuestionState {
  switch (action.type) {
    case Actions.ADD_QUESTION: {
      const question: Question = new Question(
        action.payload.email,
        action.payload.title,
        action.payload.content,
        action.payload.id
      );
      return questionAdapter.addOne(question, state);
    }
    case Actions.REMOVE_QUESTION:
      return questionAdapter.removeOne(action.payload, state);
    case Actions.LOAD_QUESTIONS_SUCCESS:
      return questionAdapter.addMany(action.payload, state);
    default:
      return state;
  }
}

export const selectQuestionState = (state: AppState) => state.questions;

export const { selectAll: selectAllQuestions } = questionAdapter.getSelectors();
