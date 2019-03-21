export class Note {
  id: Number;
  title: String;
  text: String;
  state: String;
  pinned: Boolean = false;

  constructor(title = '', text = '', state = 'Not Started') {
    this.title = title;
    this.text = text;
    this.pinned = false;
  }
}
