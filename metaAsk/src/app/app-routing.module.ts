import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./components/about/about.component";
import { ContactInfoComponent } from "./components/contact-info/contact-info.component";

const routes: Routes = [
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "contact-info",
    component: ContactInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routingComponents = [AboutComponent, ContactInfoComponent];
