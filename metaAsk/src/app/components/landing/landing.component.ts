import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import * as AuthActions from "../../actions/authActions";
import { Observable } from "rxjs";
import { selectAuthState } from "src/app/reducers";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"]
})
export class LandingComponent implements OnInit {
  getState: Observable<any>;
  isAuthenticated: false;
  user = null;
  errorMessage = null;
  @Output() userLogged = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  logOut(): void {
    this.store.dispatch(new AuthActions.LogOut());
    this.userLogged.emit(false);
  }
}
