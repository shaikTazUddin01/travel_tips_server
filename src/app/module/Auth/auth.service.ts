import { IAuth } from "./auth.interface";
import { Auth } from "./auth.model";

// create new user
const createAuthInFoDB=async(data:IAuth)=>{
    const res=await Auth.create(data);
    return res
}

export const authService={
    createAuthInFoDB
}