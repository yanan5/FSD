import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditNoteViewComponent } from './../edit-note-view/edit-note-view.component';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from './../services/router.service';
@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private routerService: RouterService
  ) {
    const noteId = +this.activatedRoute.snapshot.paramMap.get('noteId');
    this.dialog
      .open(EditNoteViewComponent, {
        data: {
          noteId
       }
      })
      .afterClosed()
      .subscribe(res => {
        this.routerService.routeBack();
      });
  }

  ngOnInit() { }

}
