import {Component, Input, Signal, TemplateRef, ViewChild} from '@angular/core';
import {TableModule} from 'primeng/table';
import {NgTemplateOutlet} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MultiSelectModule } from 'primeng/multiselect';
import {Tag} from 'primeng/tag';
import {Select} from 'primeng/select';

export interface TableColumn<T = any> {
  order: number;
  field: keyof T | string;
  header: string;
  type?: string;
  canBeHidden?: boolean;
  isVisible?: boolean;
}

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.html',
  standalone: true,
  imports: [
    TableModule,
    NgTemplateOutlet,
    FormsModule,
    MultiSelectModule,
    Tag,
    Select
  ]
})
export class SmartTableComponent<T> {
  @Input({required: true}) data!: Signal<T[]>;
  @Input({required: true}) columns!: Signal<TableColumn<T>[]>;


  @ViewChild('textHeader', { static: true }) textHeader!: TemplateRef<any>;
  @ViewChild('selectHeader', { static: true }) selectHeader!: TemplateRef<any>;
  @ViewChild('dateHeader', { static: true }) dateHeader!: TemplateRef<any>;
rows= 15

  getTemplate(type: string): TemplateRef<any> {
    switch (type) {
      case 'text': return this.textHeader;
      case 'select': return this.selectHeader;
      case 'date': return this.dateHeader;
      default: return this.textHeader;
    }

  }

  getUniquePropertyOptions<K extends keyof T>(property: K): { label: string; value: T[K] }[] {
    const values = this.data().map(item => item[property]);
    const uniqueValues = Array.from(new Set(values));
    return uniqueValues.map(value => ({
      label: String(value),
      value: value
    }));
  }





}
