import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StoreModule } from "@ngrx/store";
import { questionReducer } from "../../reducers/question.reducer";

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature("question", questionReducer)]
})
export class QuestionModule {}
