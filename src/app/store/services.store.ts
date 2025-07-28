import { signalStore, withComputed } from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import { AppStore } from 'src/app/store/appstore';
import {emptyPermissions} from 'src/app/models/permissions';

export const ServicesStore = signalStore(
  withComputed(() => {
    const appStore = inject(AppStore);
    const p =
      computed(() => appStore.user()?.permissions ?? emptyPermissions());


    const servicesMenuItems = computed<any[]>(() => [
      {
        label: 'Returns Discrepancies',
        routerLink: 'discrepancy',
        visible: p().hasAnyDiscrepancyRole,
      },
      {
        label: 'Bulk Destruction',
        routerLink: 'bulk-destruction',
        visible:p().hasAnyBulkDestructionRole,
      },
      {
        label: 'Returns Destruction',
        routerLink: 'returns-destruction',
        visible:p().hasAnyReturnsDestructionRole
      },
    ]);

    const servicesVisibleCount = computed(() =>
      servicesMenuItems().filter((item) => item.visible).length
    );

    const defaultServicesRoute = computed(() => {

      if (p().hasAnyDiscrepancyRole && !p().hasAnyBulkDestructionRole && !p().hasAnyReturnsDestructionRole) {
        return 'discrepancy';
      } else if (p().hasAnyBulkDestructionRole && !p().hasAnyDiscrepancyRole && !p().hasAnyReturnsDestructionRole) {
        return 'bulk-destruction';
      } else if (p().hasAnyReturnsDestructionRole && !p().hasAnyDiscrepancyRole && !p().hasAnyBulkDestructionRole) {
        return 'returns-destruction';
      } else {
        return p().hasAnyDiscrepancyRole
          ? 'discrepancy'
          : p().hasAnyBulkDestructionRole
            ? 'bulk-destruction'
            : p().hasAnyReturnsDestructionRole
              ? 'returns-destruction'
              : '';
      }
    });

    return {
      servicesMenuItems,
      servicesVisibleCount,
      defaultServicesRoute,
    };
  })
);
