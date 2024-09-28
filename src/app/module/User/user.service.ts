import { IUSER } from "./user.interface";
import { User } from "./user.model";

// create new user
const createUserInFoDB=async(data:IUSER)=>{
    const res=await User.create(data);
    return res
}

export const userService={
    createUserInFoDB
}