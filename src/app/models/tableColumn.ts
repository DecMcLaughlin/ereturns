export interface TableColumn<T = any> {
  order: number;
  field: keyof T;
  header: string;
  type?: 'text' | 'date' | 'select';
  userHideable?: boolean;
  hidden?: boolean;
  prepopulatedFilter?: any;
  filterable: boolean;
  dateSearch?: boolean;
}

