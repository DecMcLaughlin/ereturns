import {Component, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tooltip} from 'primeng/tooltip';
import {Draggable, Droppable} from 'primeng/dragdrop';

@Component({
  selector: 'app-discrepency-home',
  imports: [
    NgClass,
    FormsModule,
    Tooltip,
    Draggable,
    Droppable

  ],
  templateUrl: './discrepency-home.html',
  styleUrl: './discrepency-home.css'
})
export class DiscrepencyHome implements OnInit {
  cols: any[] = [];
  draggedColumn: any = null;

  ngOnInit(): void {
    this.cols = [{
      "order": 1,
      "field": "drnNumber",
      "header": "DRN No.",
      "filterable": true,
      "prepopulatedFilter": null,
      "hidden": false,
      "userHideable": false
    }, {
      "order": 2,
      "field": "creationDate",
      "header": "Date Raised",
      "filterable": true,
      "isDate": true,
      "prepopulatedFilter": null,
      "hidden": false,
      "userHideable": true
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
      "userHideable": true
    }, {
      "order": 5,
      "field": "status",
      "header": "Status",
      "filterable": true,
      "prepopulatedFilter": null,
      "hidden": false,
      "userHideable": false
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
      "hidden": true,
      "userHideable": true
    }, {
      "order": 8,
      "field": "almacApprover",
      "header": "Almac Approver",
      "filterable": true,
      "prepopulatedFilter": null,
      "hidden": true,
      "userHideable": true
    }];

  }

// @ts-ignore
  dragStartCols(column) {
    this.draggedColumn = column;
  }

  dragEndCols() {
    this.draggedColumn = null;
  }


// @ts-ignore
  shuffleCols(event, column) {
    var draggedColumnOrder = this.draggedColumn.order;
    var hoveredColumnOrder = column.order;

    this.cols.forEach(col => {
      if (col === column && column !== this.draggedColumn) {
        this.draggedColumn.order = hoveredColumnOrder;
        col.order = hoveredColumnOrder < draggedColumnOrder ? hoveredColumnOrder + 1 : hoveredColumnOrder - 1;
        this.cols.sort(this.compare);
        this.cols.forEach((col, idx) => {
          col.order = idx + 1;
        })
        return;
      }
    })
  }

  // @ts-ignore
  toggleColumn(col) {
    col.hidden = !col.hidden;
  }

// @ts-ignore
  compare(a, b) {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  }
}
