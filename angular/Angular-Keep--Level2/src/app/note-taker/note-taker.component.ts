import { Component, OnInit } from '@angular/core';
import { Note } from './../note';
import { NotesService } from './../services/notes.service';
@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {
  note: Note;
  errMessage: String;
  serverError: Boolean;

  constructor(private noteService: NotesService) { }

  ngOnInit() {
    this.note = new Note();
  }

  addNote(form) {
    const noteName = form.controls.text;
    const noteTitle = form.controls.title;
    this.errMessage = '';
    if ((this.note.title === null || this.note.title.trim() === '') ||
      (this.note.text === null || this.note.text.trim() === '')) {
      this.errMessage = 'Title and Text both are required fields';
    } else {
      // this.notes.push(this.note);
      this.noteService.addNote(this.note)
        .subscribe(
          data => {
            this.serverError = false;
            this.note = new Note();
          },
          err => {
            this.serverError = true;
            this.errMessage = 'Http failure response for http://localhost:3004/notes: 404 Not Found';
          }
        );
    }
  }

}
