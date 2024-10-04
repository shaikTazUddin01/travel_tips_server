import { IFollowers } from "../Followers/followers.interface";
import { Follower } from "../Followers/followers.model";
import { Following } from "./following.model";

const createFollowing = async (
  { following }: { following: string },
  userId: string
) => {
  const data = {
    userId: userId,
    following: [following],
  };
  //allready user exists or not
  const isAlreadyUserExists = await Following.findOne({ userId });
  if (isAlreadyUserExists) {
    // update if the user already exists
    const res = Following.updateOne(
      { userId },
      { $addToSet: { following: following } },
      { new: true }
    );

    const existingFollowers = await Follower.findOne({ userId: following });

    if (!existingFollowers) {
      await Follower.create({ userId: following ,followers: [userId] });
    }else {
      await Follower.updateOne(
        { userId: following },
        { $addToSet: { followers: userId } }
      );
    }


    return res;
  }

  // create following first time
  const res = await Following.create(data);

  const existingFollowers = await Follower.findOne({ userId: following });

  if (!existingFollowers) {
     await Follower.create({
      userId: following,
      followers: [userId],
    });
  } else {
    await Follower.updateOne(
      { userId: following },
      {
        $addToSet: { followers: userId },
      },
      { new: true }
    );
  }

  // console.log(followerData);

  return res;
};

export const followingServer = {
  createFollowing,
};
