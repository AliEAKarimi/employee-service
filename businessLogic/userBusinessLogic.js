const DuplicateError = require("../errorHandlers/duplicateError");
const UserModel = require("../models/userModel");

module.exports = class UserBusinessLogic {
  async addUser({ id, data, parent }) {
    const user = new UserModel(id, data, parent);
    await user.save();
  }

  async updateUser({ id, data: newData, parent: newParent }) {
    const user = await UserModel.getUser(id);
    const oldUsername = user.username;
    const newUsername = newData.username;
    console.log(oldUsername, newUsername);
    if (
      newUsername &&
      newUsername !== oldUsername &&
      (await UserModel.usernameExists(newUsername))
    ) {
      throw new DuplicateError(`the user id ${newUsername} is duplicated`);
    }
    await user.update(newData, newParent);
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
  async getUserByUsername(username) {
    const user = await UserModel.getUserByUsername(username);
    return user;
  }
};
