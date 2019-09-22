import { identifierModuleUrl } from "@angular/compiler";

export class User {
  id?: string;
  username?: string;
  password?: string;

  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}
