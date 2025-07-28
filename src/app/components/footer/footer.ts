import { Component } from '@angular/core';
import {TranslocoDirective} from '@jsverse/transloco';
import { environment } from 'src/environments/environment';

const gatewayTOCUrl = environment.gatewayTOCUrl;

@Component({
  selector: 'app-footer',
  imports: [
    TranslocoDirective
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  currentYear: number = new Date().getFullYear();
  gatewayTOCUrl: string = gatewayTOCUrl;
}
