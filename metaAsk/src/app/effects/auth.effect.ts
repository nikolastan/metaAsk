import { Injectable } from "@angular/core";

import { Effect, Actions, ofType, act } from "@ngrx/effects";
import { switchMap, map, concatMap, catchError, tap } from "rxjs/operators";

import * as AuthActions from "../actions/authActions";
import * as FromServices from "../services/auth.service";
import { forkJoin, Observable, of } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: FromServices.AuthService,
    private router: Router
  ) {}

  @Effect()
  logIn$: Observable<any> = this.actions$.pipe(
    ofType<AuthActions.LogIn>(AuthActions.LOG_IN),
    switchMap(action => {
      return this.authService
        .logIn(action.payload.email, action.payload.password)
        .pipe(
          map(user => {
            const payload = {
              token: user,
              email: action.payload.email
            };
            return new AuthActions.LogInSuccess(payload);
          }),
          catchError(error => {
            return of(new AuthActions.LogInFailure({ error: error }));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  logInSuccess$: Observable<any> = this.actions$.pipe(
    ofType(AuthActions.LOG_IN_SUCCESS),
    tap(user => {
      localStorage.setItem("token", user.payload.accessToken);
      this.router.navigateByUrl("/");
    })
  );

  @Effect({ dispatch: false })
  logInFailure$: Observable<any> = this.actions$.pipe(
    ofType(AuthActions.LOG_IN_FAILURE)
  );

  @Effect()
  signUp$: Observable<any> = this.actions$.pipe(
    ofType(AuthActions.SIGN_UP),
    map((action: AuthActions.SignUp) => action.payload),
    switchMap(payload => {
      return this.authService.signUp(payload.email, payload.password).pipe(
        map(user => {
          return new AuthActions.SignUpSuccess({
            token: user.accessToken,
            email: payload.email
          });
        }),
        catchError(error => {
          console.log(error);
          return of(new AuthActions.SignUpFailure({ error: error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  signUpSuccess$: Observable<any> = this.actions$.pipe(
    ofType(AuthActions.SIGN_UP_SUCCESS),
    tap(user => {
      localStorage.setItem("token", user.payload.token);
      this.router.navigateByUrl("/");
    })
  );

  @Effect({ dispatch: false })
  signUpFailure$: Observable<any> = this.actions$.pipe(
    ofType(AuthActions.SIGN_UP_FAILURE)
  );

  @Effect({ dispatch: false })
  logOut$: Observable<any> = this.actions$.pipe(
    ofType(AuthActions.LOG_OUT),
    tap(user => {
      localStorage.removeItem("token");
    })
  );
}
