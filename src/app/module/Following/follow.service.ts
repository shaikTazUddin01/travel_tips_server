import { IFollowers } from "../Followers/followers.interface";
import { Follower } from "../Followers/followers.model";
import { Following } from "./following.model";

// // create following
// const createFollowing = async (
//   { following }: { following: string },
//   userId: string
// ) => {
//   const data = {
//     userId: userId,
//     following: [following],
//   };
//   //allready user exists or not
//   const isAlreadyUserExists = await Following.findOne({ userId });
//   if (isAlreadyUserExists) {
//     // update if the user already exists
//     const res = Following.updateOne(
//       { userId },
//       { $addToSet: { following: following } },
//       { new: true }
//     );
//     // check already followes or not
//     const existingFollowers = await Follower.findOne({ userId: following });

//     if (!existingFollowers) {
//       await Follower.create({ userId: following, followers: [userId] });
//     } else {
//       await Follower.updateOne(
//         { userId: following },
//         { $addToSet: { followers: userId } },
//         { new: true }
//       );
//     }

//     return res;
//   }

//   // create following first time
//   const res = await Following.create(data);
//   // check already followes or not
//   const existingFollowers = await Follower.findOne({ userId: following });

//   if (!existingFollowers) {
//     await Follower.create({
//       userId: following,
//       followers: [userId],
//     });
//   } else {
//     await Follower.updateOne(
//       { userId: following },
//       {
//         $addToSet: { followers: userId },
//       },
//       { new: true }
//     );
//   }
//   return res;
// };

const createFollowing = async (
  { following }: { following: string },
  userId: string
) => {
  const isAlreadyUserExists = await Following.findOne({ userId });

  if (isAlreadyUserExists) {
    const isFollowing = isAlreadyUserExists.following.includes(
      following as any
    );

    if (isFollowing) {
      await Following.updateOne(
        { userId },
        { $pull: { following: following } }
      );

      await Follower.updateOne(
        { userId: following },
        { $pull: { followers: userId } }
      );

      return { message: "Unfollowed successfully" };
    } else {
      await Following.updateOne(
        { userId },
        { $addToSet: { following: following } }
      );

      const existingFollowers = await Follower.findOne({ userId: following });

      if (!existingFollowers) {
        await Follower.create({ userId: following, followers: [userId] });
      } else {
        await Follower.updateOne(
          { userId: following },
          { $addToSet: { followers: userId } }
        );
      }

      return { message: "Followed successfully" };
    }
  }

  const res = await Following.create({ userId, following: [following] });

  const existingFollowers = await Follower.findOne({ userId: following });

  if (!existingFollowers) {
    await Follower.create({
      userId: following,
      followers: [userId],
    });
  } else {
    await Follower.updateOne(
      { userId: following },
      { $addToSet: { followers: userId } }
    );
  }

  return res;
};

// get my following

const getMyFollowing = async (id: string) => {
  const res = await Following.findOne({ userId: id })
    .populate("userId")
    .populate("following");

  return res;
};

export const followingServer = {
  createFollowing,
  getMyFollowing,
};
