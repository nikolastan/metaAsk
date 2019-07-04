import { Answer } from "./answer.model";

export class Question {
  name: string;
  title: string;
  content: string;
  id: string;

  constructor(name, title, content, id) {
    this.name = name;
    this.title = title;
    this.content = content;
    this.id = id;
  }
}
