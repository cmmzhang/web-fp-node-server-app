import followsModel from "./follows-model.js";

export const followUser = async (follow) => {
  const actualFollow = await followsModel.create(follow)
  return actualFollow
}

export const findFollowers = async (followed) => {
  const result = await followsModel.find({ followed })
  .populate('follower')
  .exec()
  return result
}

export const findFollowing = (follower) => {
  const result = followsModel.find({ follower })
  .populate('followed')
  .exec()
  return result
}