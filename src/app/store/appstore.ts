// app.store.ts
import {computed, inject} from '@angular/core';
import {signalStore, withState, withMethods, withComputed, patchState, withHooks} from '@ngrx/signals';
import {User} from '../models/user';
import {emptyPermissions, Permissions} from '../models/permissions';
import {environment} from 'src/environments/environment';
import {AppConstants} from '../constants/AppConstants';
import {MenuItem} from 'primeng/api';
import {Dataservice} from 'src/app/services/dataservice';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {AlmacResponseEnvelope} from 'src/app/models/almacResponseEnvelope';
import {catchError, of, tap} from 'rxjs';

const gatewaySignOutUrl = environment.gatewaySignOutUrl;

type AppState = {
  title: string;
  user: User | null;
  token: string | null;
  isInitialized: boolean;
  isLoading?: boolean;
};

const initialState: AppState = {
  title: '',
  user: null,
  token: null,
  isInitialized: false,
  isLoading:false
};

export const AppStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),

  withComputed((state) => {
    return {
      isUserAuthed: computed(() => !!state.token),
      user: state.user,
      menuItems: computed<MenuItem[]>(() => {

        const p = state.user()?.permissions ?? emptyPermissions();
        return [
          {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: 'home',
          },
          {
            label: 'Services',
            icon: 'pi pi-pw pi-cog',
            routerLink: 'services',
          },
          {
            label: 'Maintenance',
            icon: 'pi pi-pw pi-wrench',
            visible: p.hasAnyInternalRole || p.hasAdminViewRole || p.hasReturnsApproverRole,
            routerLink: 'customer-maintenance',
          },
          {
            label: 'Record History',
            icon: 'pi pi-pw pi-replay',
            routerLink: 'audit',
            visible: p.hasAnyInternalRole || p.hasAdminViewRole || p.hasReturnsApproverRole,
          },
          {
            label: 'Help',
            icon: 'pi pi-pw pi-question-circle',
            command: () => window.open('https://your-help-link.com'),
          },
        ];
      }),
    };
  }),

  withMethods((store, dataService = inject(Dataservice)) => ({
    setTitle: (title: string) => {
      patchState(store, {title});
    },

    authenticate: rxMethod<void>(
      () =>
        dataService.auth().pipe(
          tap((ro: AlmacResponseEnvelope) => {
            const user = ro.data.user;
            const token = ro.data.token;

            if (token) {
              user.permissions = resolvePermissions(user);
              patchState(store, {
                user,
                token,
                isInitialized: true,
              });
              localStorage.setItem('eReturns-token', token);
            } else {
              window.location.href = gatewaySignOutUrl;
            }
          }),
          catchError((err) => {
            console.log("Authentication failed, redirecting to sign out." + err);
            window.location.href = gatewaySignOutUrl;
            return of(); // Return empty observable to complete the stream
          })
        )
    ),


    logout: () => {
      patchState(store, {
        user: null,
        token: null,
      });
      localStorage.removeItem('eReturns-token');
      window.location.href = gatewaySignOutUrl;
    },

  })),
  withHooks({
    onInit(store) {
      store.authenticate()
    }
  })
);

function resolvePermissions(user: User): Permissions {
  const groups = user.groups || [];
  return {
    hasReturnsApproverRole: groups.includes(AppConstants.ROLE_RETURNS_APPROVER),
    hasAdminViewRole: groups.includes(AppConstants.ROLE_ADMIN_VIEW),
    hasReturnsAdminRole: groups.includes(AppConstants.ROLE_RETURNS_ADMIN),
    hasCRReturnsRole: groups.includes(AppConstants.ROLE_CR_RETURNS),
    hasDUReturnsRole: groups.includes(AppConstants.ROLE_DU_RETURNS),
    hasIEReturnsRole: groups.includes(AppConstants.ROLE_IE_RETURNS),
    hasPAReturnsRole: groups.includes(AppConstants.ROLE_PA_RETURNS),
    hasSGReturnsRole: groups.includes(AppConstants.ROLE_SG_RETURNS),
    hasEReturnsViewRole: groups.includes(AppConstants.ROLE_RETURNS_VIEW),
    hasEReturnsApproveRole: groups.includes(AppConstants.ROLE_RETURNS_APPROVE),
    hasEReturnsDiscrepancyViewRole: groups.includes(AppConstants.ROLE_DISCREPANCY_VIEW),
    hasEReturnsDiscrepancyApproveRole: groups.includes(AppConstants.ROLE_DISCREPANCY_APPROVE),
    hasEReturnsBulkDestructionViewRole: groups.includes(AppConstants.ROLE_BULK_DESTRUCTION_VIEW),
    hasEReturnsBulkDestructionApproveRole: groups.includes(AppConstants.ROLE_BULK_DESTRUCTION_APPROVE),
    hasEReturnsBulkDestructionApproverRole: groups.includes(AppConstants.ROLE_BULK_DESTRUCTION_ADDITIONAL_APPROVER),
    hasEReturnsReturnsDestructionViewRole: groups.includes(AppConstants.ROLE_RETURNS_DESTRUCTION_VIEW),
    hasEReturnsReturnsDestructionApproveRole: groups.includes(AppConstants.ROLE_RETURNS_DESTRUCTION_APPROVE),
    hasEReturnsReturnsDestructionApproverRole: groups.includes(AppConstants.ROLE_RETURNS_DESTRUCTION_ADDITIONAL_APPROVER),
    hasAnyInternalRole: [
      AppConstants.ROLE_RETURNS_ADMIN,
      AppConstants.ROLE_CR_RETURNS,
      AppConstants.ROLE_DU_RETURNS,
      AppConstants.ROLE_IE_RETURNS,
      AppConstants.ROLE_PA_RETURNS,
      AppConstants.ROLE_SG_RETURNS,
    ].some(role => groups.includes(role)),
    hasAnyDiscrepancyRole:
      groups.includes(AppConstants.ROLE_ADMIN_VIEW) ||
      groups.includes(AppConstants.ROLE_RETURNS_APPROVER) ||
      groups.includes(AppConstants.ROLE_RETURNS_ADMIN) ||
      groups.includes(AppConstants.ROLE_CR_RETURNS) ||
      groups.includes(AppConstants.ROLE_DU_RETURNS) ||
      groups.includes(AppConstants.ROLE_SG_RETURNS) ||
      groups.includes(AppConstants.ROLE_RETURNS_VIEW) ||
      groups.includes(AppConstants.ROLE_RETURNS_APPROVE) ||
      groups.includes(AppConstants.ROLE_DISCREPANCY_VIEW) ||
      groups.includes(AppConstants.ROLE_DISCREPANCY_APPROVE),

    hasAnyBulkDestructionRole:
      groups.includes(AppConstants.ROLE_ADMIN_VIEW) ||
      groups.includes(AppConstants.ROLE_RETURNS_APPROVER) ||
      groups.includes(AppConstants.ROLE_RETURNS_ADMIN) ||
      groups.includes(AppConstants.ROLE_CR_RETURNS) ||
      groups.includes(AppConstants.ROLE_DU_RETURNS) ||
      groups.includes(AppConstants.ROLE_IE_RETURNS) ||
      groups.includes(AppConstants.ROLE_PA_RETURNS) ||
      groups.includes(AppConstants.ROLE_SG_RETURNS) ||
      groups.includes(AppConstants.ROLE_RETURNS_VIEW) ||
      groups.includes(AppConstants.ROLE_RETURNS_APPROVE) ||
      groups.includes(AppConstants.ROLE_BULK_DESTRUCTION_VIEW) ||
      groups.includes(AppConstants.ROLE_BULK_DESTRUCTION_APPROVE) ||
      groups.includes(AppConstants.ROLE_BULK_DESTRUCTION_ADDITIONAL_APPROVER),

    hasAnyReturnsDestructionRole:
      groups.includes(AppConstants.ROLE_ADMIN_VIEW) ||
      groups.includes(AppConstants.ROLE_RETURNS_APPROVER) ||
      groups.includes(AppConstants.ROLE_RETURNS_ADMIN) ||
      groups.includes(AppConstants.ROLE_CR_RETURNS) ||
      groups.includes(AppConstants.ROLE_DU_RETURNS) ||
      groups.includes(AppConstants.ROLE_SG_RETURNS) ||
      groups.includes(AppConstants.ROLE_RETURNS_VIEW) ||
      groups.includes(AppConstants.ROLE_RETURNS_APPROVE) ||
      groups.includes(AppConstants.ROLE_RETURNS_DESTRUCTION_VIEW) ||
      groups.includes(AppConstants.ROLE_RETURNS_DESTRUCTION_APPROVE) ||
      groups.includes(AppConstants.ROLE_RETURNS_DESTRUCTION_ADDITIONAL_APPROVER)
  };
}
