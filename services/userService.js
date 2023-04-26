const { userDB, parentDB } = require("../database/databases");
const DuplicateError = require("../errorHandlers/duplicateError");
const UserModel = require("../models/userModel");

module.exports = class UserService {
  async addUser({ id, data, parent }) {
    const user = new UserModel(id, data, parent);
    await user.save();
  }

  async updateUser({ id: oldUsername, data, parent, newUsername }) {
    if (
      newUsername &&
      newUsername !== oldUsername &&
      (await UserModel.exists(userDB, `user:${newUsername}`))
    ) {
      throw new DuplicateError(`the user id ${newUsername} is duplicated`);
    }
    const user = await UserModel.getUser(oldUsername);
    await user.update(data, parent, newUsername);
    if (newUsername && newUsername !== oldUsername) {
      await UserModel.delete(oldUsername);
    }
  }
  async getUserInfo(id) {
    const user = await UserModel.getUser(id);
    return user;
  }
  async deleteUser(id) {
    await UserModel.delete(id);
  }
  async getUsersOfAParent(parent) {
    const ids = await UserModel.getUsersOfAParent(parent);
    // const users = await Promise.all(ids.map((id) => this.getUserInfo(id)));
    const users = await Promise.all(ids.map((id) => UserModel.getUser(id)));
    return users;
  }
};
