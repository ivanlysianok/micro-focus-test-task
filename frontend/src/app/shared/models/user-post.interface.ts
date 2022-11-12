import { User } from './user.interface';

export interface UserPost {
  id: number;
  userId: number;
  title: string;
  body: string;
  user?: User;
}
