// auth-token.service.ts
import { Injectable, inject } from '@angular/core';
import { AppStore } from '../store/appstore';

@Injectable({ providedIn: 'root' })
export class AuthTokenService {
  private store = inject(AppStore);
  get token(): string | null {
    return this.store.token();
  }

}
