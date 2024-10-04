export interface IUSER {
  name: string;
  userName?:string;
  email: string;
  password: string;
  image: string;
  age:number;
  address: string;
  gender: "Male" | "Female" | "Other";
  role: "USER" | "ADMIN";
  phoneNumber: string;
  isVerify:boolean;
  
  status:"Active"|"Blocked"
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
