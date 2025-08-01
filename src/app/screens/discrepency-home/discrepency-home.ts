import {Component, computed, inject} from '@angular/core';
import {ReturnsDiscrepanciesStore} from 'src/app/store/returns.discrepancies.store'
import {TableColumn} from 'src/app/models/tableColumn';
import {BulkDestructionRequest} from 'src/app/models/bulkDestructionRequest';
import {SmartTableComponent} from 'src/app/components/smart-table/smart-table';
import {SelectButton} from 'primeng/selectbutton';
import {Personalise} from 'src/app/components/personalise/personalise';
import {Site} from 'src/app/models/site';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-discrepency-home',
  imports: [
    SmartTableComponent,
    SelectButton,
    Personalise,
    FormsModule

  ],
  templateUrl: './discrepency-home.html',
  styleUrl: './discrepency-home.css',
  providers: [ReturnsDiscrepanciesStore]
})
export class DiscrepencyHome  {
  store = inject(ReturnsDiscrepanciesStore);
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

  updatePersonalisation(event: {
    tableColumns: TableColumn[],
    sites: Site[],
    defaultSite?: Site
  }) {
    console.log('Received personalisation update', event);
    this.store.updatePersonalisation(event);
  }
}
