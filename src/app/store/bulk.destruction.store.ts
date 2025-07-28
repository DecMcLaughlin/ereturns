import {patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {Dataservice} from 'src/app/services/dataservice';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {catchError, of, tap} from 'rxjs';

import { Paginator } from '../models/paginator';
import {TableColumn} from 'src/app/components/smart-table/smart-table';


type BulkDestructionState = {
  params:{
    paginator: Paginator
    organizationId: number,
    includeApprovedCancelledClosed: boolean
  }
  tableColumns?: TableColumn[];
  tableData?: any[];
};

const initialState: BulkDestructionState = {
  params :{
    paginator:  {
      from: 1,
      to: 15
    },
    organizationId: 101,
    includeApprovedCancelledClosed: false
  } ,
  tableColumns:[
    { order: 1, field: 'drnNumber', header: 'BDRN No.', canBeHidden: true, isVisible: true },
    { order: 2, field: 'creationDate', header: 'Date raised', canBeHidden: true, type:'date', isVisible: true},
    { order: 3, field: 'customer', header:'Customer', canBeHidden: true, isVisible: true },
    { order: 4, field: 'partialLots', header: 'Partial Lots', canBeHidden: true, type: 'select', isVisible: true},
    { order: 5, field: 'status', header: 'Status', canBeHidden: true,  type: 'select', isVisible: true },
    { order: 6, field: 'raisedBy', header: 'Raised By', canBeHidden: true, isVisible: true},
    { order: 7,  field: 'customerApprover', header: 'Customer Approver', canBeHidden: true, isVisible: true },
    { order: 8, field: 'almacApprover', header: 'Almac Approver', canBeHidden: true, isVisible: true }

  ],
  tableData:[]
};

export const BulkDestructionStore = signalStore(
  withState(initialState),
  withMethods((store, dataService = inject(Dataservice)) => ({
    getBulkDestructionRequests: rxMethod<void>(
      () =>
        dataService.getBulkDestructionRequestsByOrganizationId(store.params.organizationId(),
          store.params.includeApprovedCancelledClosed(),
          store.params.paginator()).pipe(
          tap((ro: any) => {
            const data = ro.data.bulkDestructionRequests;
              patchState(store, {tableData: data});

          }),
          catchError((err) => {
            console.log("Failed to retrieve bulk destruction requests", err);
            return of(); // Return empty observable to complete the stream
          })
        ),
    ),

    updateTableColumns(updated: TableColumn[]) {
      patchState(store, { tableColumns: updated });
      // TODO: persist to backend here if needed
    }

  })),
  withHooks({
    onInit(store) {
      store.getBulkDestructionRequests()
    }
  })
);
