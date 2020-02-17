import { Component, ViewChild } from '@angular/core';

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

}
