import { QuestionState, AnswerState } from "./reducers/main-reducer";

export interface AppState {
  questions: QuestionState;
  answers: AnswerState;
}
