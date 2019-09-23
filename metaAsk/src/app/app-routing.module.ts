import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LandingComponent } from "./components/landing/landing.component";

const routes: Routes = [
  {
    path: "log-in",
    component: LoginComponent
  },
  {
    path: "sign-up",
    component: SignupComponent
  },
  {
    path: "",
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routingComponents = [
  LoginComponent,
  SignupComponent,
  LandingComponent
];
