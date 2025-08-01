import { MenuItem } from 'primeng/api';

export interface Attachment {
  uuid?: string;
  attachmentId?: number;
  filePath?: string;
  fileName?: string;
  fileSize?: number;
  toRemove?: boolean;
}
