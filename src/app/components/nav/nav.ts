import {Component, inject} from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {AppStore} from 'src/app/store/appstore';

@Component({
  selector: 'app-nav',
  imports: [
    Menubar
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  readonly store= inject(AppStore)
}
