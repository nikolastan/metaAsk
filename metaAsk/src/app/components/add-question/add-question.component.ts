import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
/* import { Question } from "src/app/models/question.model"; */
import { UUID } from "angular2-uuid";
import { FormControl, Validators } from "@angular/forms";
import * as QuestionActions from "../../actions/questionActions";
import { Observable } from "rxjs";
import { selectAuthState } from "src/app/reducers";

@Component({
  selector: "app-add-question",
  templateUrl: "./add-question.component.html",
  styleUrls: ["./add-question.component.css"]
})
export class AddQuestionComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  content: string;
  @Output() formSubmit = new EventEmitter<boolean>();

  authState: Observable<any>;
  @Input()
  isAuthenticated: false;
  user = null;

  titleInp = new FormControl("", [
    Validators.required,
    Validators.minLength(10)
  ]);
  contentInp = new FormControl("", [
    Validators.required,
    Validators.minLength(50)
  ]);

  constructor(private store: Store<AppState>) {
    this.authState = this.store.select(selectAuthState);
  }

  onFormSubmit() {
    this.formSubmit.emit(true);
  }

  ngOnInit() {}

  ngOnChanges() {
    this.authState.subscribe(state => {
      this.user = state.user;
    });
  }

  generateUUID() {
    return UUID.UUID();
  }

  addQuestion(title, content) {
    const id = this.generateUUID();
    const payload = {
      email: this.user.email,
      title: title,
      content: content,
      id: id
    };
    this.store.dispatch(new QuestionActions.AddQuestion(payload));
  }

  removeQuestion(number) {
    this.store.dispatch(new QuestionActions.RemoveQuestion(number));
  }
}
