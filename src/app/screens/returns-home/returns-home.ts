import {Component, computed, inject} from '@angular/core';
import {Personalise} from 'src/app/components/personalise/personalise';
import {SelectButton} from 'primeng/selectbutton';
import {SmartTableComponent} from 'src/app/components/smart-table/smart-table';
import {TableColumn} from 'src/app/models/tableColumn';
import {BulkDestructionRequest} from 'src/app/models/bulkDestructionRequest';
import {Site} from 'src/app/models/site';
import {FormsModule} from '@angular/forms';
import {ReturnsDestructionStore} from 'src/app/store/returns.destruction.store';

@Component({
  selector: 'app-returns-home',
  imports: [
    Personalise,
    SelectButton,
    SmartTableComponent,
    FormsModule
  ],
  templateUrl: './returns-home.html',
  styleUrl: './returns-home.css',
  providers: [ReturnsDestructionStore]

})
export class ReturnsDestructionHome {
  store = inject(ReturnsDestructionStore);
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
