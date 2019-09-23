export class Question {
  email: string;
  title: string;
  content: string;
  id: string;

  constructor(email, title, content, id) {
    this.email = email;
    this.title = title;
    this.content = content;
    this.id = id;
  }
}
