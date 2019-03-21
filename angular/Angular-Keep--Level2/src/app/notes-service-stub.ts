import { Observable } from 'rxjs/Observable';
import { Note } from './note';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

export class NotesServiceStub {
  addNote(note: Note): Observable<Note> {
    if (note.title === 'invalid' && note.text === 'invalid') {
      return Observable.throw({message: 'Your values are invalid'});
    }
    return Observable.of(note);
  }
}

