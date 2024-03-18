import { map } from 'rxjs';

// Source
export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
  eye_color: string;
}
export function eyeColor() {
  return map((user: IUser) => user?.eye_color);
}
