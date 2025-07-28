import {Component, inject, OnInit} from '@angular/core';
import { NgOptimizedImage} from '@angular/common';
import {TranslocoDirective} from '@jsverse/transloco';
import {environment} from '../../../environments/environment';
import {AppStore} from '../../store/appstore';
import {TitleService} from '../../services/titleservice';

const gatewayHomeUrl = environment.gatewayHomeUrl;

@Component({
  selector: 'app-header',
  imports: [
    NgOptimizedImage,
    TranslocoDirective
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit{

  public store = inject(AppStore);
  private _= inject(TitleService)
  gatewayHomeUrl: string = gatewayHomeUrl;

  user = this.store.user;

  ngOnInit(): void {

    const userValue = this.store.user(); // This should be the actual User object or null
    console.log('Evaluated user value:', userValue);

  }
}
