import { Component, OnInit, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { FormControl, Validators } from "@angular/forms";
import { UUID } from "angular2-uuid";
import * as QuestionActions from "../../actions/actions";

@Component({
  selector: "app-add-answer",
  templateUrl: "./add-answer.component.html",
  styleUrls: ["./add-answer.component.css"]
})
export class AddAnswerComponent implements OnInit {
  @Input()
  answer: string;
  @Input()
  questionId: string;

  answerInp = new FormControl("", [
    Validators.required,
    Validators.minLength(20)
  ]);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  addAnswer(answer, questionId) {
    const id = UUID.UUID();
    const payload = {
      answer: answer,
      questionId: questionId,
      id: id
    };
    this.store.dispatch(new QuestionActions.AddAnswer(payload));
  }
}
