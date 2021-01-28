import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerAddComponent } from './add.component';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    template: ''
  })
  export class CustomerAddDummy {
    constructor(public dialog: MatDialog,
                private router: Router,
                private route: ActivatedRoute) {
      this.openDialog();
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(CustomerAddComponent, {
            width: '70vw',
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result) 
                this.router.navigate(['/customers/details', result], { relativeTo: this.route });
            else
                this.router.navigate(['/customers'], { relativeTo: this.route });
        });
    }
}
