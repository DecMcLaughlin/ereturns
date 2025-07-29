import {Component, EventEmitter, Input, OnInit, Output, Signal} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {TableColumn} from 'src/app/models/tableColumn';
import {Draggable, Droppable} from 'primeng/dragdrop';
import {Tooltip} from 'primeng/tooltip';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-personalise',
  imports: [
    ButtonDirective,
    FormsModule,
    Draggable,
    Droppable,
    Tooltip,
    NgClass,
  ],
  templateUrl: './personalise.html',
  styleUrl: './personalise.css'
})
export class Personalise implements OnInit {

  @Input({required: true}) cols!: Signal<TableColumn[]>;
  @Output() columnsChanged = new EventEmitter<TableColumn[]>();

  // cols: any[] = [];
  draggedColumn: any = null;


  ngOnInit(): void {


  }

  showPersonalize: boolean = false;
  sites: { name: string; default: boolean; selected: boolean }[] = [
    {name: 'Craigavon', default: true, selected: false},
    {name: 'Dundalk', default: false, selected: true},
    {name: 'Durham', default: false, selected: true},
    {name: 'Souderton', default: false, selected: true},
    {name: 'Singapore', default: false, selected: true}
  ];


  toggleColumns() {
    this.showPersonalize = !this.showPersonalize;
  }

  makeDefault(selectedSite: { name: string; default: boolean }) {
    this.sites.forEach(site => (site.default = false));
    selectedSite.default = true;
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

    this.cols().forEach(col => {
      if (col === column && column !== this.draggedColumn) {
        this.draggedColumn.order = hoveredColumnOrder;
        col.order = hoveredColumnOrder < draggedColumnOrder ? hoveredColumnOrder + 1 : hoveredColumnOrder - 1;
        this.cols().sort(this.compare);
        this.cols().forEach((col, idx) => {
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
