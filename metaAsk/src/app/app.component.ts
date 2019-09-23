import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "metaAsk";
  isAddVisible: boolean;
  formSubmit: boolean;
  userLogged: boolean;

  getFormSubmit(formSubmit) {
    if (formSubmit) this.isAddVisible = false;
  }

  getElement(elementRef) {
    if (elementRef.userLogged)
      elementRef.userLogged.subscribe(event => {
        this.userLogged = event;
      });
  }

  ngOnInit() {
    this.isAddVisible = false;
  }

  toggleAddVisible() {
    this.isAddVisible = !this.isAddVisible;
  }
}
