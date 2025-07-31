import { BulkDestructionRequestDetail } from "./bulkDestructionRequestDetail";

export interface BulkDestructionRequest {
  organization?: number;
  customerEmails?: string;
  bulkDestructionRequestId?: number;
  drnNumber?: string;
  customer?: string;
  quote?: string;
  protocol?: string;
  projectNumber?: string;
  almacLotNumber?: string;
  vendorLotNumber?: string;
  lotAgingDays?: number;
  status?: string;
  expiredOnly?: boolean;
  excludeSamples?: boolean;
  quoteNumber?: string;
  medsSelectedForRetain?: boolean;
  partialLots?:string;
  raisedBy?:string;
  internallyCreated?: boolean;

  inventory?: BulkDestructionRequestDetail[];
  // sampleInventory?: BulkDestructionRequestDetail;

  bulkDestructionRequestAudit?: BulkDestructionRequestAudit;
}

export interface BulkDestructionRequestAudit {
  customerEmailsCount?: number;
  customerCount?: number;
  organizationCount?: number;
  protocolCount?: number;
  projectNumberCount?: number;
  quoteCount?: number;
  almacLotNumberCount?: number;
  vendorLotNumberCount?: number;
  lotAgingDaysCount?: number;
  expiredOnlyCount?: number;
  excludeSamplesCount?: number;
}
