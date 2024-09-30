export interface IUSER {
  name: string;
  email: string;
  password: string;
  image: string;
  address: string;
  gender: "Male" | "Female" | "Other";
  role: "USER" | "ADMIN";
  phoneNumber: string;
}
export interface IDecodedUser {
  userId: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  image: string;
  phoneNumber: string;
  iat: number,
  exp: number
}
