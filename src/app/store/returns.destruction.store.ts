import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {inject} from '@angular/core';
import {Dataservice} from 'src/app/services/dataservice';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {catchError, of, tap, map} from 'rxjs';
import {Paginator} from '../models/paginator';
import {TableColumn} from 'src/app/models/tableColumn';
import {Site} from 'src/app/models/site';
import {FilterMetadata} from 'primeng/api';
import {
  DEFAULT_RETURNS_TABLE_COLUMNS,
  DEFAULT_SITES,
} from 'src/app/constants/defaults.config';
import {applyPrepopulatedFilters, updateColumnFilter, updatePersonalisation} from 'src/app/utils/store-utils';


type ReturnsDestructionState = {
  params: {
    paginator: Paginator;
    organizationId: number;
    includeApprovedCancelledClosed: boolean;
  };
  tableColumns: TableColumn[];
  tableData?: any[];
  filters: { [key: string]: FilterMetadata[] };
  sites: Site[];
};

const initialState: ReturnsDestructionState = {
  params: {
    paginator: {
      from: 1,
      to: 15,
    },
    organizationId: 101,
    includeApprovedCancelledClosed: false,
  },
  sites: DEFAULT_SITES,
  tableColumns: DEFAULT_RETURNS_TABLE_COLUMNS,
  filters: {},
  tableData: [],
};

export const ReturnsDestructionStore = signalStore(
  withState(initialState),
  withMethods((store, dataService = inject(Dataservice)) => {
    const updateColumnFilterFn = <T>(field: keyof T, value: any) =>
      updateColumnFilter<T>(store, field, value);

    return {
      getReturnsByOrganizationId: rxMethod<void>(() =>
        dataService
          .getReturnsDestructionRequestsByOrganizationId(
            store.params.organizationId(),
            store.params.includeApprovedCancelledClosed(),
            store.params.paginator()
          )
          .pipe(
            map((ro: any) => ro.data.returnsDestructionRequests),
            tap((data) => patchState(store, {tableData: data})),
            catchError((err) => {
              console.log('Failed to retrieve returns destruction requests', err);
              return of();
            })
          )
      ),

      updatePersonalisation: (p: {
        tableColumns: TableColumn[];
        sites: Site[];
        defaultSite?: Site
      }) => updatePersonalisation(store, p),

      updateColumnFilter: updateColumnFilterFn,

      applyPrepopulatedFilters: <T>() =>
        applyPrepopulatedFilters<T>(store, updateColumnFilterFn),
    };
  }),

  withHooks({
    onInit(store) {
      store.getReturnsByOrganizationId();
      store.applyPrepopulatedFilters<any>();
    },
  })
);
