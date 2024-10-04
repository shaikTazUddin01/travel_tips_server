import { Follower } from "./followers.model"


const getMyAllFollowers=async(userId:string)=>{
    const res=await Follower.findOne({userId}).populate("userId").populate("followers")

    return res
}

export const followersService={
    getMyAllFollowers
}