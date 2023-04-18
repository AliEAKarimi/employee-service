const { userDB, parentDB } = require("../database/databases");
const UserModel = require("../models/userModel");
const DatabaseError = require("../errorHandlers/databaseError");
module.exports = class UserService {
  async addUser({ id, data, parent }) {
    // Create user model
    const user = new UserModel(id, data, parent);
    try {
      await user.save(userDB, parentDB);
    } catch (error) {
      throw new DatabaseError("Error in adding data");
    }
  }
  // id: oldUsername
  async updateUser({ id, data, parent }) {
    // Create user model
    const user = new UserModel(id, data, parent);
    try {
      await user.update(userDB, parentDB, data, parent);
    } catch (error) {
      throw new DatabaseError("Error in updating data");
    }
  }
  async getUserInfo(id) {
    try {
      // Get user model
      const user = await UserModel.getUser(userDB, parentDB, id);
      return user;
    } catch (error) {
      throw new DatabaseError("Error in getting data");
    }
  }
  async deleteUser(id) {
    try {
      await UserModel.delete(userDB, parentDB, id);
    } catch (error) {
      throw new DatabaseError("Error in deleting data");
    }
  }
};
