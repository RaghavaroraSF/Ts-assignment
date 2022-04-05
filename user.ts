import { Role } from "./role";
export class User {
  id: number;
  firstName: string;
  middleName: string | undefined;
  lastName: string;
  email: string;
  phone: string;
  role: Role;
  address: string;
  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.middleName = user.middleName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.phone = user.phone;
    this.role = user.role;
    this.address = user.address;
  }
}