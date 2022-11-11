import { UserAdress } from './user-adress.interface';
import { UserCompany } from './user-company.interface';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  adress: UserAdress;
  phone: string;
  website: string;
  company: UserCompany;
}
