import { IFollow } from "./follow.interface"
import { Follow } from "./follow.model"


const createFollow=async({following}:{following:string},userId:string)=>{

const data={
    userId:userId,
    following:[following]
}
// console.log(data);
    const isAlreadyUserExists=await Follow.findOne({userId});
    if (isAlreadyUserExists) {
        console.log("object-->");
        // const following=[...isAlreadyUserExists.following,payload]
        // const res= Follow.updateOne({userId},following,{new:true})
        // return res
        // const following=[...isAlreadyUserExists.following,payload?.followingId]
        return null
    }

    const res=Follow.create(data)
// return null;
    return res
}

export const followServer={
    createFollow
}