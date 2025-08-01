import { DiscrepancyDetail } from "./discrepancyDetail";

export interface Discrepancy {
  discrepancyId?: number;
  drdNumber?: number;
  creationDate?: string;
  almacLotNumber?: string;
  protocol?: string;
  customer?: string;
  country?: string;
  customerEmails?: string;
  siteNumber?: string;
  irtShipmentNumber?: string;
  awbNumber?: string;
  category?: string;
  organization?: any;
  status?: string;
  dateResponseDue?: string;
  raisedBy?: string;
  creationUserEmail?: string;

  receiptDate?: string;
  irtUpdateDate?: string;
  responseDueDate?: string;
  reminderSentDate?: string;
  closedDate?: string;
  closedWithoutResponse?: string;
  submittedDate?: string;

  discrepancyDetails?: DiscrepancyDetail[];
  closedComments?: string;

  discrepancyAudit?: DiscrepancyAudit;
}

export interface DiscrepancyAudit {
  almacLotNumberCount?: number;
  categoryCount?: number;
  organizationCount?: number;
  customerCount?: number;
  protocolCount?: number;
  siteNumberCount?: number;
  countryCount?: number;
  customerEmailsCount?: number;
  dateOfReceiptCount?: number;
  irtShipmentNumberCount?: number;
  awbNumberCount?: number;
  statusCount?: number;
}

export const emptyDiscrepancy = (): Discrepancy => ({

});
