export interface TableColumn<T = any> {
  order: number;
  field: keyof T;
  header: string;
  dateSearch?: boolean;
  type?: 'text' | 'date' | 'select';
  userHideable?: boolean;
  hidden?: boolean;
  prepopulatedFilter?: any;
  filterable: boolean;
}

