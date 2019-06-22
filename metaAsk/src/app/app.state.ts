import { Question } from "./models/question.model";

export interface AppState {
  readonly questions: Question[];
}
