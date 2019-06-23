import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StoreModule } from "@ngrx/store";
import { questionReducer } from "../../reducers/question.reducer";
import { effects } from "../../effects";
import { EffectsModule } from "@ngrx/effects";
import * as FromServices from "../../services";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("question", questionReducer),
    EffectsModule.forFeature(effects)
  ],
  providers: [FromServices.QuestionService]
})
export class QuestionModule {}
