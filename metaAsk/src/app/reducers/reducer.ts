import { createEntityAdapter, EntityState, EntityAdapter } from "@ngrx/entity";
import * as Actions from "../actions/actions";
import { Question } from "../models/question.model";
import { Answer } from "../models/answer.model";
import { AppState } from "../app.state";

export interface QuestionState extends EntityState<Question> {}
export interface AnswerState extends EntityState<Answer> {}

export const questionAdapter: EntityAdapter<Question> = createEntityAdapter<
  Question
>();
export const answerAdapter: EntityAdapter<Answer> = createEntityAdapter<
  Answer
>();

export const questionInitialState: QuestionState = questionAdapter.getInitialState();
export const answerInitialState: AnswerState = answerAdapter.getInitialState();

const initialState = {
  questions: questionInitialState,
  answers: answerInitialState
};

export function Reducer(
  state: AppState = initialState,
  action: Actions.Actions
) {
  switch (action.type) {
    case Actions.ADD_QUESTION: {
      const question: Question = new Question(
        action.payload.name,
        action.payload.title,
        action.payload.content,
        action.payload.id
      );
      return {
        ...state,
        questions: questionAdapter.addOne(question, state.questions)
      };
    }
    case Actions.REMOVE_QUESTION:
      return {
        ...state,
        questions: questionAdapter.removeOne(action.payload, state.questions)
      };
    case Actions.LOAD_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: questionAdapter.addMany(action.payload, state.questions)
      };
    case Actions.LOAD_ANSWERS_SUCCESS:
      return {
        ...state,
        answers: [
          ...state.answers, //fix state of non-return answers correctly
          answerAdapter.addMany(action.payload, state.answers)
        ]
      };
    default:
      return state;
  }
}

export const selectQuestionState = (state: AppState) => state.questions;
export const selectAnswerState = (state: AppState) => state.answers;

export const { selectAll: selectAllQuestions } = questionAdapter.getSelectors();
export const { selectAll: selectAllAnswers } = answerAdapter.getSelectors();
