import {patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {Dataservice} from 'src/app/services/dataservice';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {catchError, of, tap} from 'rxjs';

import {Paginator} from '../models/paginator';
import {TableColumn} from 'src/app/models/tableColumn';
import {Site} from 'src/app/models/site';


type BulkDestructionState = {
  params: {
    paginator: Paginator
    organizationId: number,
    includeApprovedCancelledClosed: boolean
  }
  tableColumns: TableColumn[];
  tableData?: any[];
  sites: Site[]
};

const initialState: BulkDestructionState = {
  params: {
    paginator: {
      from: 1,
      to: 15
    },
    organizationId: 101,
    includeApprovedCancelledClosed: false
  },

  sites: [{"name": "Craigavon", "value": 101, "hidden": false, "default": true}, {
    "name": "Dundalk",
    "value": 4665,
    "hidden": false,
    "default": false
  }, {"name": "Durham", "value": 103, "hidden": false, "default": false}, {
    "name": "Souderton",
    "value": 102,
    "hidden": false,
    "default": false
  }, {"name": "Singapore", "value": 1245, "hidden": false, "default": false}],
  tableColumns: [{
    "order": 1,
    "field": "drnNumber",
    "header": "DRN No.",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": false,
  }, {
    "order": 2,
    "field": "creationDate",
    "header": "Date Raised",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true,
    "type": 'date'
  }, {
    "order": 3,
    "field": "customer",
    "header": "Customer",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }, {
    "order": 4,
    "field": "partialLots",
    "header": "Partial Lots",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true,
    "type": 'select'
  }, {
    "order": 5,
    "field": "status",
    "header": "Status",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": false,
    "type": 'select',
  }, {
    "order": 6,
    "field": "raisedBy",
    "header": "Raised By",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }, {
    "order": 7,
    "field": "customerApprover",
    "header": "Customer Approver",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }, {
    "order": 8,
    "field": "almacApprover",
    "header": "Almac Approver",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }],


  tableData: []
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

    updatePersonalisation(personalisation: {
      tableColumns: TableColumn[],
      sites: Site[],
      defaultSite?: Site
    }) {

      patchState(store, {
        tableColumns: [...personalisation.tableColumns],
        sites: [...personalisation.sites]
      });


      if (personalisation.defaultSite) {
        // Trigger side effects like calling the DAB
        const defaultSite = personalisation.defaultSite;
      }
    }


  })),
  withHooks({
    onInit(store) {
      store.getBulkDestructionRequests()
    }
  })
);
