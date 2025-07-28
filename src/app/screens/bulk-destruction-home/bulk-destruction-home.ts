import {Component, computed, inject} from '@angular/core';
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


}
