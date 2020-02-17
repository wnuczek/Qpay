import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerDetailsComponent } from './customers/details/details.component';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    template: ''
  })
  export class DialogEntryComponent {
    constructor(public dialog: MatDialog,
                private router: Router,
                private route: ActivatedRoute) {
      this.openDialog(CustomerDetailsComponent);
    }
    openDialog(component): void {
        const id = this.route.snapshot.paramMap.get('id');
        console.log(id);
        const dialogRef = this.dialog.open(component, {
            width: '70vw',
            data: id
        });
        dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['../../'], { relativeTo: this.route });
            console.log('The dialog was closed');
        });
    }
}
