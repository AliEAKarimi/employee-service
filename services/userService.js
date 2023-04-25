const { userDB, parentDB } = require("../database/databases");
const UserModel = require("../models/userModel");
const DuplicateError = require("../errorHandlers/duplicateError");
module.exports = class UserService {
  async addUser({ id, data, parent }) {
    // Create user model
    const user = new UserModel(id, data, parent);
    await user.save(userDB, parentDB);
  }

  async updateUser({ id: oldUsername, data, parent, newUsername }) {
    if (
      newUsername &&
      newUsername !== oldUsername &&
      (await UserModel.exists(userDB, newUsername))
    ) {
      throw new DuplicateError(`the user id ${newUsername} is duplicated`);
    }
    // Create user model
    const user = await UserModel.getUser(userDB, parentDB, oldUsername);
    await user.update(userDB, parentDB, data, parent, newUsername);
  }
  async getUserInfo(id) {
    // Get user model
    const user = await UserModel.getUser(userDB, parentDB, id);
    return user;
  }
  async deleteUser(id) {
    await UserModel.delete(userDB, parentDB, id);
  }
};
