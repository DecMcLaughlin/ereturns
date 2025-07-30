import {Component, EventEmitter, Input, OnInit, Output, Signal} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {TableColumn} from 'src/app/models/tableColumn';
import {Draggable, Droppable} from 'primeng/dragdrop';
import {Tooltip} from 'primeng/tooltip';
import {NgClass} from '@angular/common';
import {Site} from 'src/app/models/site';

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
export class Personalise {

  @Input({required: true}) cols!: Signal<TableColumn[]>;
  @Input({required: true}) sites!: Signal<Site[]>;
  @Output() personalisationChanged = new EventEmitter<{
    tableColumns: TableColumn[],
    sites: Site[],
    defaultSite?: Site
  }>();

  draggedColumn: any = null;
  showPersonalize: boolean = false;

  emitPersonalisationUpdate() {
    // Clone the current state
    const updatedSites = this.sites().map(site => ({ ...site }));
    const updatedCols = this.cols().map(col => ({ ...col }));

    // Apply any mutations here (e.g., based on UI state)
    const defaultSite = updatedSites.find(s => s.default);

    // Emit the updated state
    this.personalisationChanged.emit({
      tableColumns: updatedCols,
      sites: updatedSites,
      defaultSite
    });
  }

  showPersonronalize() {
    this.showPersonalize = !this.showPersonalize;
  }


  makeDefault(selectedSite: Site) {
    const updatedSites = this.sites().map(site => ({
      ...site,
      default: site.value === selectedSite.value,
      hidden: site.hidden
    }));

    this.personalisationChanged.emit({
      tableColumns: this.cols().map(col => ({ ...col })),
      sites: updatedSites,
      defaultSite: selectedSite
    });
  }

  toggleColumnVisibility(col: TableColumn) {
    const updatedCols = this.cols().map(c => ({ ...c }));

    const target = updatedCols.find(c => c.field === col.field);
    if (target) {
      target.hidden = !target.hidden;
    }

    this.personalisationChanged.emit({
      tableColumns: updatedCols,
      sites: this.sites().map(site => ({ ...site })),
      defaultSite: this.sites().find(s => s.default)
    });
  }


  toggleSiteVisibility(site: Site) {
    const updatedSites = this.sites().map(s => ({
      ...s,
      hidden: s.value === site.value ? !s.hidden : s.hidden,
      default: s.default
    }));

    this.personalisationChanged.emit({
      tableColumns: this.cols().map(col => ({ ...col })),
      sites: updatedSites,
      defaultSite: updatedSites.find(s => s.default)
    });
  }


  dragStartCols(column: TableColumn) {
    this.draggedColumn = column.field;
  }

  dragEndCols() {
    this.draggedColumn = null;
  }

  shuffleCols(event: any, column: TableColumn) {
    const updatedCols = this.cols().map(col => ({ ...col }));

    const dragged = updatedCols.find(col => col.field === this.draggedColumn);
    const hovered = updatedCols.find(col => col.field === column.field);

    if (dragged && hovered && dragged.field !== hovered.field) {
      const draggedOrder = dragged.order;
      const hoveredOrder = hovered.order;

      dragged.order = hoveredOrder;
      hovered.order = hoveredOrder < draggedOrder ? hoveredOrder + 1 : hoveredOrder - 1;

      updatedCols.sort((a, b) => a.order - b.order);
      updatedCols.forEach((col, idx) => col.order = idx + 1);

      this.personalisationChanged.emit({
        tableColumns: updatedCols,
        sites: this.sites().map(site => ({ ...site })),
        defaultSite: this.sites().find(s => s.default)
      });
    }
  }

}
