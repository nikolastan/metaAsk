import { QuestionState, AnswerState } from "./reducers/reducer";

export interface AppState {
  questions: QuestionState;
  answers: AnswerState;
}
