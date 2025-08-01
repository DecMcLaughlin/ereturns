import {Component, computed, EventEmitter, Input, Output, Signal, TemplateRef, ViewChild} from '@angular/core';
import {TableModule} from 'primeng/table';
import {NgClass, NgTemplateOutlet} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MultiSelectModule } from 'primeng/multiselect';
import {Tag} from 'primeng/tag';
import {Select} from 'primeng/select';
import {TableColumn} from 'src/app/models/tableColumn';
import {FilterMetadata} from 'primeng/api';
import {InputText} from 'primeng/inputtext';

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
    Select,
    InputText,
    NgClass
  ]
})
export class SmartTableComponent<T> {

  @Input({required: true}) data!: Signal<T[]>;
  @Input({required: true}) columns!: Signal<TableColumn<T>[]>;
  @Input({required: true}) filters!: Signal<{ [key: string]: FilterMetadata[] }>;
  @Input() rowStyleClass?: (row: T) => string;
  @Output() filterChanged = new EventEmitter<{ field: keyof T; value: any }>();


  readonly visibleColumns = computed(() =>
    this.columns()
      .filter(col => !col.hidden)
      .sort((a, b) => a.order - b.order)
  );

  readonly visibleData = computed(() => {
    const filters = this.filters();
    return this.data().filter(item => {
      return Object.entries(filters).every(([field, conditions]) => {
        return conditions.every(condition => {
          const filterValue = condition.value;

          // Skip empty filters
          if (filterValue === null || filterValue === undefined || filterValue === '') {
            return true;
          }

          const value = item[field as keyof T];

          switch (condition.matchMode) {
            case 'equals':
              return value === filterValue;

            case 'contains':
              return value != null &&
                String(value).toLowerCase().includes(String(filterValue).toLowerCase());

            default:
              console.warn(`Unhandled matchMode: ${condition.matchMode}`, { field, value, filterValue });
              return true;
          }
        });
      });
    });
  });



  @ViewChild('textHeader', { static: true }) textHeader!: TemplateRef<any>;
  @ViewChild('selectHeader', { static: true }) selectHeader!: TemplateRef<any>;
  @ViewChild('dateHeader', { static: true }) dateHeader!: TemplateRef<any>;
rows= 15


  updateFilter(field: keyof T, value: any) {
    this.filterChanged.emit({ field, value });
  }

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


  clearTextFilter(field: keyof T) {
    this.textInputs[field as string] = '';
    this.onTextInputDebounced(field, '');
  }

  logAndEmit(field: keyof T, value: any) {
    console.log('Emitting filterChanged:', field, value);
    this.filterChanged.emit({ field, value });
  }


  textInputs: { [key: string]: string } = {};
  private debounceTimers: { [key: string]: any } = {};

  onTextInputDebounced(field: keyof T, value: string) {
    clearTimeout(this.debounceTimers[field as string]);

    this.debounceTimers[field as string] = setTimeout(() => {
      this.logAndEmit(field, value);
    }, 300); // 300ms debounce
  }
  getStatusClass(status: string): string {
    console.log('Determining severity for status:', status);
    switch (status) {
      case 'Draft':
        return "bg-[rgba(238,238,238,0.85)] text-[#637383]";
      case 'Awaiting Response':
      case 'Awaiting Followup Response':
        return "bg-[#f2f7f6] text-[#01A688]";
      case 'On Hold - Partial Lots':
      case 'On Hold - Quote' :
      case 'Pending Customer Feedback':
      case 'Pending Customer Internal Approval':
        return "bg-[#faf3ef] text-[#f0a170]";
      case 'Customer Approved':
      case 'Customer Response Received':
        return "bg-[#f2f7f6] text-[#01A688]";
      case'Almac Approved' :
      case 'Cancelled':
      case 'Closed':
      case 'Closed - Retained':
        return "bg-[#f4f6fa] text-[#0172A6]";
      default:
        return "bg-[rgba(238,238,238,0.85)] text-[#637383]";
    }
  }
}
