import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppStore } from '../store/appstore';

@Injectable({ providedIn: 'root' })
export class TitleService {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private store = inject(AppStore);

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const title = this.getTitle(this.route);
        this.store.setTitle(title);
      });
  }

  private getTitle(route: ActivatedRoute): string {
    let current = route;
    while (current.firstChild) {
      current = current.firstChild;
    }
    return current.snapshot.data['title'] || 'DART Depot';
  }
}
