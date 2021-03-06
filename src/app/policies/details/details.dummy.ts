import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PolicyDetailsComponent } from './details.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
    template: ''
  })
  export class PolicyDetailsDummy {
    constructor(public dialog: MatDialog,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location) {
      this.openDialog();
    }
    openDialog(): void {
        const id = this.route.snapshot.paramMap.get('id');
        console.log(id);
        const dialogRef = this.dialog.open(PolicyDetailsComponent, {
            width: '70vw',
            data: id
        });
        dialogRef.afterClosed().subscribe(result => {
            //this.location.back();
            this.router.navigate(['../../'], { relativeTo: this.route });
            console.log('The dialog was closed');
        });
    }
}
