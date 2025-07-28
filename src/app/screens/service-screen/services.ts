import {Component, effect, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ServicesStore} from 'src/app/store/services.store';
import {Menubar} from 'primeng/menubar';
import {AppStore} from 'src/app/store/appstore';

@Component({
  selector: 'app-services',
  templateUrl: './services.html',
  styleUrls: ['./services.css'],
  standalone: true,
  imports: [
    Menubar,
    RouterOutlet
  ],
  providers:[ServicesStore]
})

export class ServicesComponent {
  private store = inject(ServicesStore);
  private appStore = inject(AppStore);
  private router = inject(Router);
  isInitialized = this.appStore.isInitialized;

  items = this.store.servicesMenuItems;
  itemsVisibleLength = this.store.servicesVisibleCount;
  defaultRoute = this.store.defaultServicesRoute;
constructor() {
  effect(() => {
    if (this.isInitialized() && this.router.url === '/services' && this.defaultRoute()) {
      this.router.navigateByUrl(`services/${this.defaultRoute()}`);
    }
  });
}
}
