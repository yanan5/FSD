import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Note } from './../note';
import { AuthenticationService} from './authentication.service';
import 'rxjs/add/operator/do';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable()
export class NotesService {
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  constructor(private http: HttpClient, private _authService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
    this.fetchNotesFromServer();
  }

  fetchNotesFromServer(): void {
    this.http.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this._authService.getBearerToken()}` })
    })
    .subscribe(notes => {
      this.notes = notes;
      this.notesSubject.next(this.notes);
     });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note): Observable<Note> {
    return this.http.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this._authService.getBearerToken()}` })
    })
    .do(addedNote => {
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes);
    });
  }

  getNoteById(noteId): Note {
    const nt = this.notes.find(note => note.id === noteId);
    return Object.assign({}, nt);
  }

  editNote(note): Observable<Note> {
    return this.http.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this._authService.getBearerToken()}` })
    })
    .do(editedNote => {
      const nte = this.notes.find(n => n.id === editedNote.id);
      Object.assign(nte, editedNote);
      this.notesSubject.next(this.notes);
    });
  }
}
