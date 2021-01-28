import { Component, ViewChild } from '@angular/core';
import { NotificationService } from './notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

//import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Qpay';
  navLinks = [
    { path: '',
      label: 'Dashboard'
    },
    { path: 'customers',
      label: 'Klienci'
    },
    { path: 'policies',
      label: 'Polisy'
    },
    { path: 'payments',
      label: 'Płatności'
    }
  ];
  @ViewChild('sidenav', { static: true }) sidenav;

  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar) {
      this.notificationService.notification$.subscribe(message => {
        this.snackBar.open(message,'X',{duration: 5000});
      });
    }
}
