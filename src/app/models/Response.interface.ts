import { User } from './User.interface';

export interface Response {
  success: boolean;
  data: User[];
  error: string;
  message: string;
}
