import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {TableColumn} from 'src/app/components/smart-table/smart-table';

@Component({
  selector: 'app-personalise',
  imports: [
    ButtonDirective,
    FormsModule,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './personalise.html',
  styleUrl: './personalise.css'
})
export class Personalise {
  @Input() columns!: any;
  @Output() columnsChanged = new EventEmitter<TableColumn[]>();

  showPersonalize: boolean = false;
  sites: { name: string; default: boolean; selected: boolean }[] = [
    { name: 'Craigavon', default: true, selected: false },
    { name: 'Dundalk', default: false, selected: true  },
    { name: 'Durham', default: false, selected: true},
    { name: 'Souderton', default: false, selected: true },
    { name: 'Singapore', default: false, selected: true }
  ];


  get sortedColumns(): TableColumn[] {
    return [...this.columns()].sort((a, b) => a.order - b.order);
  }

  toggleColumns() {
    this.showPersonalize = !this.showPersonalize;
  }

  makeDefault(selectedSite: { name: string; default: boolean }) {
    this.sites.forEach(site => (site.default = false));
    selectedSite.default = true;
  }


  drop(event: CdkDragDrop<TableColumn[]>) {
    const updated = [...this.columns()]; // original unsorted array
    moveItemInArray(updated, event.previousIndex, event.currentIndex);
    updated.forEach((col, index) => col.order = index + 1);
    this.columnsChanged.emit(updated);
  }


}
