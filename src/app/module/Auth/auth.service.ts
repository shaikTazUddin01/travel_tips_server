import { IAuth } from "./auth.interface";
import { Auth } from "./auth.model";

// create new user
const authLogin=async(data:IAuth)=>{
    const res=await Auth.create(data);
    return res
}

export const authService={
    authLogin
}