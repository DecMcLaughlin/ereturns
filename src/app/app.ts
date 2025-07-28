import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Footer} from './components/footer/footer';
import {Header} from './components/header/header';
import {environment} from 'src/environments/environment';
import {Nav} from 'src/app/components/nav/nav';

import {AppStore} from 'src/app/store/appstore';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header, Nav, ProgressSpinner],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
store = inject(AppStore);

}
