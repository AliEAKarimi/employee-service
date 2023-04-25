const { userDB, parentDB } = require("../database/databases");
const UserModel = require("../models/userModel");
const DatabaseError = require("../errorHandlers/databaseError");
module.exports = class UserService {
  async addUser({ id, data, parent }) {
    // Create user model
    const user = new UserModel(id, data, parent);
    await user.save(userDB, parentDB);
  }

  async updateUser({ id: oldUsername, data, parent, newUsername }) {
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
