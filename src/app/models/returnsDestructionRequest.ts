import { ReturnsDestructionRequestDetail } from "./returnsDestructionRequestDetail";

export interface ReturnsDestructionRequest {
  returnsDestructionRequestId? : number;
  status?: string;

  organization?: number;
  customerEmails?: string;
  drnNumber?: string;
  customer?: string;
  quote?: string;
  protocol?: string;
  almacLotNumber?: string;
  itemNumber? : string;
  raisedBy?: string;

  includePendingAudit?: boolean;
  includePendingDestruction?: boolean;
  internallyCreated?: boolean;

  inventory?: ReturnsDestructionRequestDetail[];

  returnsDestructionRequestAudit?: ReturnsDestructionRequestAudit;
}

export interface ReturnsDestructionRequestAudit {
  customerEmailsCount?: number;
  customerCount?: number;
  quoteCount?: number;
  protocolCount?: number;
  almacLotNumberCount?: number;
  organizationCount?: number;
  almacItemNumberCount?: number;
  includePendingAuditCount?: number;
  includePendingDestructionCount?: number;
}
