import { IFollowers } from "../Followers/followers.interface";
import { Follower } from "../Followers/followers.model";
import { Notification } from "../Notifacation/notification.model";
import { Following } from "./following.model";



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
      // unfollowing
      await Following.updateOne(
        { userId },
        { $pull: { following: following } }
      );

      // unfollowers
      await Follower.updateOne(
        { userId: following },
        { $pull: { followers: userId } }
      );

      // Remove follow notification
      await Notification.deleteOne({
        userId: following,
        senderId: userId,
        type: "follow",
      });
      return { message: "Unfollowed successfully" };
    } else {
      await Following.updateOne(
        { userId },
        { $addToSet: { following: following } }
      );

      const existingFollowers = await Follower.findOne({ userId: following });

      if (!existingFollowers) {
        await Follower.create({ userId: following, followers: [userId] });

        // create notification
        await Notification.create({
          userId: following,
          senderId: userId,
          type: "follow",
        });
      } else {
        await Follower.updateOne(
          { userId: following },
          { $addToSet: { followers: userId } }
        );
        // create notification
        await Notification.create({
          userId: following,
          senderId: userId,
          type: "follow",
        });
      }

      return { message: "Followed successfully" };
    }
  }
  // create following
  const res = await Following.create({ userId, following: [following] });

  // create followers
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
  // create notification
  await Notification.create({
    userId: following,
    senderId: userId,
    type: "follow",
  });

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
