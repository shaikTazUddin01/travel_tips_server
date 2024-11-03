import { User_Role } from "../constant/userRole";
 
export interface QueryParams {
    verified?: boolean;
  }

export type TUser_Role=keyof typeof User_Role