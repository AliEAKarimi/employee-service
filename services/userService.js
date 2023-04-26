const { userDB, parentDB } = require("../database/databases");
const userRepository = require("../repositories/userRepository");
const parentRepository = require("../repositories/parentRepository");
const DuplicateError = require("../errorHandlers/duplicateError");

module.exports = class UserService {
  async addUser({ id, data, parent }) {
    const newUser = { ...data, job: JSON.stringify(data.job) };
    const newParent = { parent };
    await Promise.all([
      userRepository.save(`${id}`, newUser),
      parentRepository.save(`${id}`, newParent),
    ]);
  }

  async updateUser({ id: oldUsername, data, parent, newUsername }) {
    if (
      newUsername &&
      newUsername !== oldUsername &&
      (await userDB.exists(`user:${newUsername}`))
    ) {
      throw new DuplicateError(`the user id ${newUsername} is duplicated`);
    }
    const userData = await userRepository.fetch(`${oldUsername}`);
    userData.job = JSON.parse(userData.job);
    Object.deepExtend(userData, data);
    userData.job = JSON.stringify(userData.job);
    Promise.all([
      userRepository.save(`${newUsername ?? oldUsername}`, userData),
      parentRepository.save(`${newUsername ?? oldUsername}`, {
        parent: parent ?? userData.parent,
      }),
    ]);
    if (newUsername && newUsername !== oldUsername) {
      Promise.all([
        userRepository.remove(`${oldUsername}`),
        parentRepository.remove(`${oldUsername}`),
      ]);
    }
  }
  async getUserInfo(id) {
    const [userData, { parent: userParent }] = await Promise.all([
      userRepository.fetch(`${id}`),
      parentRepository.fetch(`${id}`),
    ]);
    userData.job = JSON.parse(userData.job);
    const user = { id, userData, userParent };
    return user;
  }
  async deleteUser(id) {
    await Promise.all([
      userRepository.remove(`${id}`),
      parentRepository.remove(`${id}`),
    ]);
  }
};
