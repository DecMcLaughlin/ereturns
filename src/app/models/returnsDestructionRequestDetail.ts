import {BulkDestructionRequestDetailAudit} from "./bulkDestructionRequestDetail";

export interface ReturnsDestructionRequestDetail {
  returnsDestructionReqDetailId?: number;
  returnsDestructionRequestId?: number;
  destroy?: boolean;
  onHandQuantity?: number;
  destructionQuantity?: number;
  inventoryType?: string;
  almacLotNumber?: string;
  customerLotNumber?: string;
  itemNumber?: string;
  itemDescription?: string;
  expiryDate?: string;
  lotAge?: number;
  quote?: string;
  protocol?: string;
  customer?: string;
  receiptNumber?: string;
  receiptDate?: string;
  irtshipmentNumber?: string;
  lotStatus?: string;
  discrepancyStatus?: string;
  irtreceiptConfirmationDate?: string;
  investigator?: string;
  country?: string;
  site?: string;
  toRemove?: boolean;
  organization?: number;
  itemType?: string;
  weight?: string;
  submitFlag?:boolean;
  returnsDestructionRequestDetailAudit?: ReturnsDestructionRequestDetailAudit;

}

export interface ReturnsDestructionRequestDetailAudit {
  destroyCount?: number;
}
