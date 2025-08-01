import {Component, computed, effect, inject} from '@angular/core';
import {BulkDestructionStore} from 'src/app/store/bulk.destruction.store';
import {SmartTableComponent} from 'src/app/components/smart-table/smart-table';
import {Personalise} from 'src/app/components/personalise/personalise';

import {SelectButton} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import {TableColumn} from 'src/app/models/tableColumn';
import {Site} from 'src/app/models/site';
import {BulkDestructionRequest} from 'src/app/models/bulkDestructionRequest';

@Component({
  selector: 'app-bulk-destruction-home',
  imports: [
    SmartTableComponent,
    Personalise,
    SelectButton,
    FormsModule
  ],
  templateUrl: './bulk-destruction-home.html',
  styleUrl: './bulk-destruction-home.css',
  providers: [BulkDestructionStore]
})
export class BulkDestructionHome {
  store = inject(BulkDestructionStore);
  readonly tableData = computed(() => this.store.tableData?.() ?? []);
  readonly tableColumns = computed(():TableColumn<BulkDestructionRequest>[] => this.store.tableColumns?.() ?? []);
  readonly sites = computed(() => this.store.sites?.() ?? []);
  readonly filters = computed(() => this.store.filters?.() ?? {});
  readonly selectedSite = computed(() =>
    this.sites().find(site => site.default)
  );
  readonly visibleSites = computed(() =>
    this.sites().filter(site => !site.hidden)
  );

  constructor() {
  effect(() => {
    console.log('Parent Columns changed:', this.tableColumns());
  });
}

  updatePersonalisation(event: {
    tableColumns: TableColumn[],
    sites: Site[],
    defaultSite?: Site
  }) {
    console.log('Received personalisation update', event);
    this.store.updatePersonalisation(event);
  }


  getRowClass = (row: any) => {
    return row.partialLots === 'Yes' ? '!bg-[#f0a170]' : '';

  };
}
