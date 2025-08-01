import {TableColumn} from '../models/tableColumn';

export const DEFAULT_SITES = [
  {name: 'Craigavon', value: 101, hidden: false, default: true},
  {name: 'Dundalk', value: 4665, hidden: false, default: false},
  {name: 'Durham', value: 103, hidden: false, default: false},
  {name: 'Souderton', value: 102, hidden: false, default: false},
  {name: 'Singapore', value: 1245, hidden: false, default: false},
];
export const DEFAULT_BULK_TABLE_COLUMNS: TableColumn[] = [
  {
    order: 1,
    field: 'drdNumber',
    header: 'DRN No.',
    filterable: true,
    prepopulatedFilter: null,
    hidden: false,
    userHideable: false,
  },
  {
    order: 2,
    field: 'creationDate',
    header: 'Date Raised',
    filterable: true,
    prepopulatedFilter: null,
    hidden: false,
    userHideable: true,
    type: 'date',
  },
  {
    order: 3,
    field: 'customer',
    header: 'Customer',
    filterable: true,
    prepopulatedFilter: null,
    hidden: false,
    userHideable: true,
  },
  {
    order: 4,
    field: 'partialLots',
    header: 'Partial Lots',
    filterable: true,
    prepopulatedFilter: null,
    hidden: false,
    userHideable: true,
    type: 'select',
  },
  {
    order: 5,
    field: 'status',
    header: 'Status',
    filterable: true,
    prepopulatedFilter: null,
    hidden: false,
    userHideable: false,
    type: 'select',
  },
  {
    order: 6,
    field: 'raisedBy',
    header: 'Raised By',
    filterable: true,
    prepopulatedFilter: null,
    hidden: false,
    userHideable: true,
  },
  {
    order: 7,
    field: 'customerApprover',
    header: 'Customer Approver',
    filterable: true,
    prepopulatedFilter: null,
    hidden: false,
    userHideable: true,
  },
  {
    order: 8,
    field: 'almacApprover',
    header: 'Almac Approver',
    filterable: true,
    prepopulatedFilter: null,
    hidden: false,
    userHideable: true,
  },
];

export const DEFAULT_DISCREPANCY_TABLE_COLUMNS: TableColumn[] = [
  {
    "order": 1,
    "field": "drdNumber",
    "header": "DRD No.",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": false
  }, {
    "order": 2,
    "field": "creationDate",
    "header": "Date Raised",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true,
    "type": "date"
  }, {
    "order": 3,
    "field": "receiptDate",
    "header": "Receipt Date",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true,
    "type": "date"
  }, {
    "order": 4,
    "field": "status",
    "header": "Status",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": false
  }, {
    "order": 5,
    "field": "raisedBy",
    "header": "Raised By",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }, {
    "order": 6,
    "field": "almacLotNumber",
    "header": "Almac Lot Number",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }, {
    "order": 7,
    "field": "protocol",
    "header": "Protocol",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }, {
    "order": 8,
    "field": "customer",
    "header": "Customer",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }, {
    "order": 9,
    "field": "country",
    "header": "Country",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }, {
    "order": 10,
    "field": "siteNumber",
    "header": "Site",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }, {
    "order": 11,
    "field": "irtShipmentNumber",
    "header": "IRT Shipment No.",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }, {
    "order": 12,
    "field": "irtUpdated",
    "header": "IRT Updated",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }, {
    "order": 13,
    "field": "awbNumber",
    "header": "AWB Reference",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }, {
    "order": 14,
    "field": "category",
    "header": "Category",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }, {
    "order": 15,
    "field": "dateResponseDue",
    "header": "Date Response Due",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true,
    "type": "date"
  }, {
    "order": 16,
    "field": "reminderSentDate",
    "header": "Date Reminder Sent",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true,
    "type": "date"
  }, {
    "order": 17,
    "field": "closedDate",
    "header": "Date Closed",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true,
    "type": "date"
  }, {
    "order": 18,
    "field": "closedWithoutResponse",
    "header": "Closed Without Response",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }]

export const DEFAULT_RETURNS_TABLE_COLUMNS: TableColumn[] = [
  {
    "order": 1,
    "field": "drnNumber",
    "header": "DRN No.",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": false
  }, {
    "order": 2,
    "field": "organization",
    "header": "Almac Facility",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }, {
    "order": 3,
    "field": "creationDate",
    "header": "Date Raised",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true,
    "type": "date"
  }, {
    "order": 4,
    "field": "customer",
    "header": "Customer",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }, {
    "order": 5,
    "field": "protocol",
    "header": "Protocol",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }, {
    "order": 6,
    "field": "status",
    "header": "Status",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": false,
    "type": "select"
  }, {
    "order": 7,
    "field": "customerApprover",
    "header": "Customer Approver",
    "filterable": true,
    "prepopulatedFilter": null,
    "hidden": false,
    "userHideable": true
  }
]
