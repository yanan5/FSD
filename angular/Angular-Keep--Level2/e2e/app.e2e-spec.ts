import { browser, by, element } from 'protractor';

describe('e2e test suite', () => {
  it('when the page is loaded user is redirected to login', () => {
    browser.get('/');
    expect(browser.getCurrentUrl()).toContain('login');
  });

  it('when the logged in he is shown the notesview', () => {
    const inputElements = element.all(by.css('input'));
    inputElements.get(0).sendKeys('admin');
    inputElements.get(1).sendKeys('password');

    element(by.css('button')).click();
    expect(browser.getCurrentUrl()).toContain('dashboard/view/notesview');
    browser.sleep(5000);
  });

  it('user is able to get all the notes on the page from the server', () => {
    const notes = element.all(by.css('mat-card'));
    expect(notes.count()).toBeGreaterThan(5);
  });

  it('user should be able to take a new note', () => {
    const notes = element.all(by.css('mat-card'));
    let count = 0;
    notes.count().then((c) => count = c);
    element(by.css('mat-expansion-panel-header')).click();
    element(by.css('input')).sendKeys('test title');
    element(by.css('textarea')).sendKeys('test title');
    element(by.css('button ')).click();
    const newNotes = element.all(by.css('mat-card'));
    expect(newNotes.count()).toBeGreaterThan(count);
    browser.sleep(5000);
  });

  it('added note should remain on the patg when the browser is refreshed', () => {
    browser.refresh();
    const notes = element.all(by.css('mat-card'));
    let count = 0;
    notes.count().then((c) => count = c);
    expect(notes.count()).toBe(count);
  });

  it('user is able to edit the note', () => {

  });
});
