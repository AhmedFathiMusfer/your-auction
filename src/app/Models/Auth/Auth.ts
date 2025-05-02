interface Regisetr {
  email: string;
  Password: string;
  Name: string;
  phoneNumber: string;
  Role: string;
}
export default Regisetr;
export interface Login {
  email: string;
  password: string;
}
export interface LoginResponse {
  accessToken: string;
  userData: UserData;
}
export interface UserData {
  email: string;
  name: string;
  phoneNumber: string;
  profilePictureUrl: string;
  roles: string[];
}
