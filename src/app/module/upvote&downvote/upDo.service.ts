import { Post } from "../Post/post.model";

const upvoteToPost = async (
  userId: string,
  payload: Record<string, string>
) => {
  // console.log(payload);
  const { postId } = payload;
  console.log(userId, postId);
  const isPostExists = await Post.findById(postId);

  //   console.log(isPostExists);
  if (isPostExists) {
    const isAlreadyUpvoted = await Post.findOne({ _id: postId, like: userId });
    if (isAlreadyUpvoted) {
      const res = await Post.updateOne(
        { _id: postId },
        {
          $pull: { like: userId },
        },
        { new: true }
      );

      
      return {res,message:"downvote"};
    }

    const res = await Post.updateOne(
      { _id: postId },
      {
        $addToSet: { like: userId },
      },
      { new: true }
    );

    return {res,message:"upvote"};

  }


  return null;
};

export const upvoteService = {
  upvoteToPost,
};
