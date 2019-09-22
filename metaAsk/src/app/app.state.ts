import { QuestionState } from "./reducers/question-reducer";
import { AuthState } from "./reducers/auth-reducer";
import { AnswerState } from "./reducers/answer-reducer";

export interface AppState {
  questions: QuestionState;
  answers: AnswerState;
  auth: AuthState;
}
