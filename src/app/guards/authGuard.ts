import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AppStore } from '../store/appstore';
import {environment} from 'src/environments/environment'; // adjust path as needed

const gatewaySignOutUrl = environment.gatewaySignOutUrl;

export const authGuard: CanActivateFn = () => {
  const store = inject(AppStore);
  const isAuthed = store.isUserAuthed();
  if (!isAuthed) {
    window.location.href = gatewaySignOutUrl;
    return false;
  }
  return true;
};
