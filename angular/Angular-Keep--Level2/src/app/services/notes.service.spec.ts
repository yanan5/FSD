import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotesService } from './notes.service';
import { AuthenticationStub } from './../authentication-stub';
import { AuthenticationService } from './authentication.service';

fdescribe('NotesService', () => {
  let service: NotesService;
  let httpMock: HttpTestingController;
  const note1 = { id: 1, title: 'note1 title', text: 'note1 text', pinned: false };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NotesService,
        {
          provide: AuthenticationService,
          useClass: AuthenticationStub
        }
      ]
    });
    service = TestBed.get(NotesService);
    httpMock = TestBed.get(HttpTestingController);

    const request = httpMock.expectOne({
      url: 'http://localhost:3004/notes',
      method: 'GET'
    });

    request.flush([note1]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetchNotesFromServer should be making the right api call and update the notesSubject', () => {
    service.fetchNotesFromServer();

    const request = httpMock.expectOne({
      url: 'http://localhost:3004/notes',
      method: 'GET'
    });

    request.flush([note1]);
    service.getNotes().subscribe(notes => {
      expect(notes).toEqual([note1]);
    });
  });

  it('addNote should be calling the right api with the right paramters and updating the notesSubject', () => {
    const note2 = { id: 2, title: 'note1 title', text: 'note1 text', pinned: false };
    service.addNote(note2).subscribe(note => {
      expect(note).toEqual(note2);
    });

    const postRequest = httpMock.expectOne({
      url: 'http://localhost:3004/notes',
      method: 'POST'
    });
    postRequest.flush(note2);

    expect(postRequest.request.body).toEqual(note2);

    service.getNotes().subscribe(notes => {
      expect(notes).toEqual([note1, note2]);
    });
  });

  it('editNotes', () => {});

  it('getNotesById', () => {});

  afterEach(() => {
    httpMock.verify();
  });
});
