import {Permissions} from 'src/app/models/permissions';

export interface User {
  userName: string;
  firstName: string;
  lastName: string;
  domain: string;
  email: string;
  groups: string[];
  internal: boolean;
  permissions:Permissions
}
