export interface Permissions {
  /*
   * Internal
   */
  hasReturnsApproverRole: boolean;
  hasAdminViewRole: boolean;
  hasReturnsAdminRole: boolean;
  hasCRReturnsRole: boolean;
  hasDUReturnsRole: boolean;
  hasIEReturnsRole: boolean;
  hasPAReturnsRole: boolean;
  hasSGReturnsRole: boolean;
  hasAnyInternalRole: boolean;

  /*
   * External
   */
  hasEReturnsViewRole: boolean;
  hasEReturnsApproveRole: boolean;
  hasEReturnsDiscrepancyViewRole: boolean;
  hasEReturnsDiscrepancyApproveRole: boolean;
  hasEReturnsBulkDestructionViewRole: boolean;
  hasEReturnsBulkDestructionApproveRole: boolean;
  hasEReturnsBulkDestructionApproverRole: boolean;
  hasEReturnsReturnsDestructionViewRole: boolean;
  hasEReturnsReturnsDestructionApproveRole: boolean;
  hasEReturnsReturnsDestructionApproverRole: boolean;

  /*
 * Other
 */
  hasAnyDiscrepancyRole: boolean;
  hasAnyBulkDestructionRole: boolean;
  hasAnyReturnsDestructionRole: boolean;
}

export const emptyPermissions = (): Permissions => ({
  hasReturnsApproverRole: false,
  hasAdminViewRole: false,
  hasReturnsAdminRole: false,
  hasCRReturnsRole: false,
  hasDUReturnsRole: false,
  hasIEReturnsRole: false,
  hasPAReturnsRole: false,
  hasSGReturnsRole: false,
  hasAnyInternalRole: false,
  hasEReturnsViewRole: false,
  hasEReturnsApproveRole: false,
  hasEReturnsDiscrepancyViewRole: false,
  hasEReturnsDiscrepancyApproveRole: false,
  hasEReturnsBulkDestructionViewRole: false,
  hasEReturnsBulkDestructionApproveRole: false,
  hasEReturnsBulkDestructionApproverRole: false,
  hasEReturnsReturnsDestructionViewRole: false,
  hasEReturnsReturnsDestructionApproveRole: false,
  hasEReturnsReturnsDestructionApproverRole: false,
  hasAnyDiscrepancyRole: false,
  hasAnyBulkDestructionRole: false,
  hasAnyReturnsDestructionRole: false,

});
