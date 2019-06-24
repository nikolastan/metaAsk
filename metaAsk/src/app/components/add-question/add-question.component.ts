import { Component, OnInit, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { Question } from "src/app/models/question.model";
import { UUID } from "angular2-uuid";
import * as QuestionActions from "../../actions/question.actions";

@Component({
  selector: "app-add-question",
  templateUrl: "./add-question.component.html",
  styleUrls: ["./add-question.component.css"]
})
export class AddQuestionComponent implements OnInit {
  @Input()
  name: string | "Anonymous";
  @Input()
  title: string;
  @Input()
  content: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  generateUUID() {
    return UUID.UUID();
  }

  addQuestion(name, title, content) {
    const id = this.generateUUID();
    const payload = {
      name: name,
      title: title,
      content: content,
      id: id
    };
    this.store.dispatch(new QuestionActions.AddQuestion(payload));

    this.name = "";
    this.title = "";
    this.content = "";
  }

  removeQuestion(number) {
    this.store.dispatch(new QuestionActions.RemoveQuestion(number));
  }
}
