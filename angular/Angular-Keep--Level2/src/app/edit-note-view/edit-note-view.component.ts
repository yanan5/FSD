import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from './../note';
import { NotesService } from './../services/notes.service';
@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  errMessage: String;
  constructor(
    private dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private notesService: NotesService) { }

  ngOnInit() {
    this.note = this.notesService.getNoteById(this.data.noteId);
  }

  editNote() {
    this.notesService.editNote(this.note)
      .subscribe(
        editedNote => {
          this.dialogRef.close();
        },
        err => {
          this.errMessage = err.message;
        });
  }

}
