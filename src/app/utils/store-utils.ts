import { patchState } from '@ngrx/signals';
import { TableColumn } from 'src/app/models/tableColumn';
import { Site } from 'src/app/models/site';

export function applyPrepopulatedFilters<T>(
  store: any,
  updateColumnFilter: (field: keyof T, value: any) => void
) {
  const columns = store.tableColumns();
  columns.forEach((col: TableColumn) => {
    if (col.prepopulatedFilter) {
      updateColumnFilter(col.field as keyof T, col.prepopulatedFilter.value);
    }
  });
}

export function updateColumnFilter<T>(
  store: any,
  field: keyof T,
  value: any
) {
  const columns = store.tableColumns();
  const col = columns.find((c: TableColumn) => c.field === field);
  if (!col) return;

  const type = col.type ?? 'text';
  let matchMode: string;
  let filterValue = value;

  switch (type) {
    case 'text':
      matchMode = 'contains';
      break;
    case 'select':
      matchMode = Array.isArray(value) ? 'in' : 'equals';
      break;
    case 'date':
      matchMode = col.dateSearch ? 'between' : 'equals';
      if (col.dateSearch && typeof value === 'string' && value.includes(',')) {
        const [start, end] = value.split(',').map((v) => v.trim());
        filterValue = [start, end];
      }
      break;
    default:
      matchMode = 'contains';
  }

  const updatedColumns = columns.map((c: TableColumn) =>
    c.field === field
      ? {
        ...c,
        prepopulatedFilter: { value: filterValue, matchMode },
      }
      : c
  );

  patchState(store, {
    tableColumns: updatedColumns,
    filters: {
      ...store.filters(),
      [field as string]: [{ value: filterValue, matchMode }],
    },
  });
}

export function updatePersonalisation(
  store: any,
  personalisation: {
    tableColumns: TableColumn[];
    sites: Site[];
    defaultSite?: Site;
  }
) {
  patchState(store, {
    tableColumns: [...personalisation.tableColumns],
    sites: [...personalisation.sites],
  });

  if (personalisation.defaultSite) {
    // Optional: trigger side effects like calling the DAB
    const defaultSite = personalisation.defaultSite;
    // Add logic here if needed
  }
}
