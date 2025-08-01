import { Attachment } from "./attachment";

export interface DiscrepancyDetail {
  uniqueId?: string;
  discrepancyDetailId?: number;
  subCategory?: string;
  description?: string;
  attachments?: Attachment[];
  customerComment?: string;
  previousCustomerComments?: DiscrepancyDetailComment[];
  previousDeclineComments?: DiscrepancyDetailComment[];
  customerAttachments?: Attachment[];
  approve?: boolean;
  declineComment?: string;
  adjudicateAttachments?: Attachment[];
  toRemove?: boolean;

  discrepancyDetailAudit?: DiscrepancyDetailAudit;
}

export interface DiscrepancyDetailAudit {
  subCategoryCount?: number;
  descriptionCount?: number;
  customerCommentCount?: number;
  declineCommentCount?: number;
  approveCount?: number;
  attachmentsCount?:number;
  customerAttachmentsCount?:number;
  adjudicateAttachmentsCount?:number;
}

export interface DiscrepancyDetailComment {
  customerComment?: string;
  customerCommentTimestamp?: string;
}
