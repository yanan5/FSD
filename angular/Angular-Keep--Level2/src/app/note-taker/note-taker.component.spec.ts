import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTakerComponent } from './note-taker.component';
import { MatFormFieldModule, MatExpansionModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesService } from '../services/notes.service';
import { NotesServiceStub } from '../notes-service-stub';
import { By } from '@angular/platform-browser';
import { Note } from '../note';

describe('NoteTakerComponent', () => {
  let component: NoteTakerComponent;
  let fixture: ComponentFixture<NoteTakerComponent>;
  let service: NotesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoteTakerComponent],
      imports: [
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      providers: [{
        provide: NotesService,
        useClass: NotesServiceStub
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteTakerComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(NotesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an input element for note title', () => {
    const de = fixture.debugElement.query(By.css('input'));
    expect(de).toBeTruthy();
    expect(de.nativeElement.value).toBe('');
  });

  it('should have an textarea for note text', () => {
    const de = fixture.debugElement.query(By.css('textarea'));
    expect(de).toBeTruthy();
    expect(de.nativeElement.value).toBe('');
  });

  it('should have a button with value "Done"', () => {
    const de = fixture.debugElement.query(By.css('button'));
    expect(de).toBeTruthy();
    expect(de.nativeElement.textContent).toBe('Done');
  });

  it('right service method is called with right parameter', () => {
    spyOn(service, 'addNote').and.callThrough();

    const testNote = new Note();
    testNote.text = 'test text';
    testNote.title = 'test title';
    component.note = testNote;
    fixture.detectChanges();

    const ele = fixture.debugElement.query(By.css('button'));
    ele.nativeElement.click();
    fixture.detectChanges();

    expect(service.addNote).toHaveBeenCalledWith(testNote);
    expect(component.note.title).toBe('');
  });

  it('should not be able to take notes if note title is blank, button is disabled', () => {
    const testNote = new Note();
    testNote.title = '';
    component.note = testNote;
    fixture.detectChanges();
    const ele = fixture.debugElement.query(By.css('button'));
    expect(ele.nativeElement.disabled).toBe(true);
  });

  it('should not be able to take notes if note text is blank, button is disabled', () => {
    const testNote = new Note();
    testNote.text = '';
    component.note = testNote;
    fixture.detectChanges();
    const ele = fixture.debugElement.query(By.css('button'));
    expect(ele.nativeElement.disabled).toBe(true);
  });

  it('panel should be seen collpased by default', () => {
    const ele = fixture.debugElement.query(By.css('mat-expansion-panel .mat-expanded'));
    expect(ele).toBeFalsy();
  });

  it('panel should be expanded when clicked', () => {
    const ele = fixture.debugElement.query(By.css('mat-expansion-panel-header'));
    ele.nativeElement.click();
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('mat-expansion-panel .mat-expanded'));
    expect(el).toBeTruthy();
  });
});
