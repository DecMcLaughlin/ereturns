


export interface Paginator {
  from?: number;
  to?: number;
  filters?: {
    [s: string]: any;
  };
  sorting?: {
    field: string;
    order: number;
  }
  customer?: string;
  organization?: number;
  quote?: string;
  protocol?: string;
  almacLotNumber?: string;
  itemNumber?: string;
  includePendingAudit?: string;
  includePendingDestruction?: string;
}
