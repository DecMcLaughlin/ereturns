export interface TableColumn<T = any> {
  order: number;
  field: string;
  header: string;
  type?: 'text' | 'date' | 'select';
  userHideable?: boolean;
  hidden?: boolean;
  prepopulatedFilter?: any;
  filterable: boolean;
  dateSearch?: boolean;
}

