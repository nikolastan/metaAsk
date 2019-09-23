import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { User } from "src/app/models/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import * as AuthActions from "../../actions/authActions";
import { Observable } from "rxjs";
import { selectAuthState } from "src/app/reducers";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  user: User = new User();
  getState$: Observable<any>;
  errorMessage: string | null;
  @Output() userLogged = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>) {
    this.getState$ = this.store.select(selectAuthState);
  }
  ngOnInit() {
    this.getState$.subscribe(state => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.userLogged.emit(true);
    this.store.dispatch(new AuthActions.SignUp(payload));
  }
}
