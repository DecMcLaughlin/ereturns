import {Component, computed, effect, inject} from '@angular/core';
import {BulkDestructionStore} from 'src/app/store/bulk.destruction.store';
import {SmartTableComponent} from 'src/app/components/smart-table/smart-table';
import {Personalise} from 'src/app/components/personalise/personalise';

@Component({
  selector: 'app-bulk-destruction-home',
  imports: [
    SmartTableComponent,
    Personalise
  ],
  templateUrl: './bulk-destruction-home.html',
  styleUrl: './bulk-destruction-home.css',
  providers:[BulkDestructionStore]
})
export class BulkDestructionHome {
  store = inject(BulkDestructionStore);
  readonly tableData = computed(() => this.store.tableData?.() ?? []);
  readonly tableColumns = computed(() => this.store.tableColumns?.() ?? []);


  constructor() {
    effect(() => {
      const data = this.tableColumns();
      if (data.length > 0) {
        console.log('Table data loaded:', data);
      }
    });
  }

}
