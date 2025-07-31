
export interface FilterChangedEvent<T> {
  field: keyof T;
  value: any;
}
