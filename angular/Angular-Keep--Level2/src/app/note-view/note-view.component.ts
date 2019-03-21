import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from './../note';
import { NotesService } from './../services/notes.service';
@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {
  notes: Array<Note>;
  errMessage;
  serverError = false;
  constructor(private noteService: NotesService) {
  }

  getNotes() {
    return this.noteService.getNotes()
      .subscribe(
        (val) => {
          this.serverError = false;
          this.notes = val;
          console.log(val, val instanceof Array);
        },
        err => {
          console.log('from note view',err);
          this.serverError = true;
          this.errMessage = 'Http failure response for http://localhost:3004/notes: 404 Not Found';
        }
      );
  }


  ngOnInit() {
    this.getNotes();
  }

}
