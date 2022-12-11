import usersModel from "./users-model.js";

export const createUser = async (user) =>
    await usersModel.create(user);

export const findAllUsers = async () =>
    await usersModel.find()

export const findUserById = async (uid) =>
    await usersModel.findById(uid, {password: false})

export const findByUsername = async (username) =>
    await usersModel.findOne({ username })

export const findByCredentials = async (username, password) => {
    const user = await usersModel.findOne({ username, password })
    return user
}

export const deleteUser = async (uid) =>
    await usersModel.deleteOne({ _id: uid })

export const updateUser = async (uid, userUpdates) => {
  await usersModel.updateOne({ _id: uid },
      { $set: userUpdates })
}

