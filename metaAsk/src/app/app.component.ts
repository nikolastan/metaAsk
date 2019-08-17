import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "metaAsk";
  isAddVisible: boolean;
  formSubmit: boolean;

  getFormSubmit(formSubmit) {
    if (formSubmit) this.isAddVisible = false;
  }

  ngOnInit() {
    this.isAddVisible = false;
  }

  toggleAddVisible() {
    this.isAddVisible = !this.isAddVisible;
  }
}
