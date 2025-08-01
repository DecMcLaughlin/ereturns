import {inject, Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {AlmacResponseEnvelope} from 'src/app/models/almacResponseEnvelope';
import { Paginator } from '../models/paginator';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class Dataservice {
private http = inject(HttpClient);
  auth() {
    return this.http.get<AlmacResponseEnvelope>(`${baseUrl}security/jwt`);
  };
  /*
 * Bulk Destruction
 */
  getBulkDestructionRequestsByOrganizationId(organizationId: number, includeApprovedCancelledClosed: boolean, paginator: Paginator) {
    return this.http.post(`${baseUrl}bulk-destruction/search?organizationId=${organizationId}&includeApprovedCancelledClosed=${includeApprovedCancelledClosed}`, paginator);
  }
  getDiscrepanciesByOrganizationId(organizationId: number, includeClosed: boolean, paginator: Paginator) {
    return this.http.post(`${baseUrl}discrepancy/search?organizationId=${organizationId}&includeClosed=${includeClosed}`, paginator);
  }
  getReturnsDestructionRequestsByOrganizationId(organizationId: number, includeApprovedCancelledClosed: boolean, paginator: Paginator) {
    return this.http.post(`${baseUrl}returns-destruction/search?organizationId=${organizationId}&includeApprovedCancelledClosed=${includeApprovedCancelledClosed}`, paginator);
  }
}
