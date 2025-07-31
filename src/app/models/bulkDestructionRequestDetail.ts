import { BulkDestructionRequestDetailMedicationToRetain } from "./bulkDestructionRequestDetailMedicationToRetain";


export interface BulkDestructionRequestDetail {
  bulkDestRequestDetailRowNumber?: number;
  bulkDestructionRequestDetailId?: number;
  bulkDestructionRequestId?: number;
  destroy?: boolean;
  onHandQuantity?: number;
  destructionQuantity?: number;
  inventoryType?: string;
  itemNumber?: string;
  itemDescription?: string;
  almacLotNumber?: string;
  vendorLotNumber?: string;
  customerLotNumber?: string;
  expiryDate?: string;
  lotAge?: number;
  customer?: string;
  protocol?: Array<string>
  quote?: string;
  billToQuote?: string;
  itemType?: string;
  lotStatus?: string;
  lotDisposition?: string;
  changeControlRef?: string;
  customerPart?: string;
  subInventory?: string;
  projectNumber?: string;
  organization?: number;

  message?: any;
  serialized?: boolean;
  pooledLot?: boolean;
  submitFlag?:boolean;
  medsToRetain?: BulkDestructionRequestDetailMedicationToRetain[];
  bulkDestructionRequestDetailAudit?: BulkDestructionRequestDetailAudit;

  toRemove?: boolean;
}

export interface BulkDestructionRequestDetailAudit {
  destroyCount?: number;
  destructionQuantityCount?: number;
}
