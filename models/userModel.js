const userRepository = require("../repositories/userRepository");
const parentRepository = require("../repositories/parentRepository");
const { EntityId } = require("redis-om");

module.exports = class UserModel {
  constructor(id, { username, jobSkill, job }, parent) {
    this.id = id;
    this.jobSkill = jobSkill;
    this.job = job;
    this.username = username;
    this.parent = parent;
  }
  async save() {
    await Promise.all([
      userRepository.save(`${this.id}`, {
        ...this.data,
        job: JSON.stringify(this.job),
      }),
      parentRepository.save(`${this.id}`, { parent: this.parent }),
    ]);
  }
  async update(newData, newParent) {
    const userData = this.data;
    Object.deepExtend(userData, newData);
    userData.job = JSON.stringify(userData.job);
    await Promise.all([
      userRepository.save(`${this.id}`, userData),
      newParent
        ? parentRepository.save(`${this.id}`, {
            parent: newParent,
          })
        : Promise.resolve("Parent not updated"),
    ]);
  }

  static async delete(id) {
    await Promise.all([
      userRepository.remove(`${id}`),
      parentRepository.remove(`${id}`),
    ]);
    await UserModel.updateParents(id);
  }
  static async updateParents(parent) {
    const ids = await UserModel.getUsersIdOfAParent(parent);
    await Promise.all(
      ids.map((id) => parentRepository.save(`${id}`, { parent: "" }))
    );
  }
  static async getUser(id) {
    const [userData, { parent: userParent }] = await Promise.all([
      userRepository.fetch(`${id}`),
      parentRepository.fetch(`${id}`),
    ]);
    userData.job = JSON.parse(userData.job);
    return new UserModel(id, userData, userParent);
  }
  static async exists(id) {
    return await userRepository.exists(id);
  }
  static async getUsersIdOfAParent(parent) {
    await parentRepository.createIndex();
    const ids = (
      await (await parentRepository.search())
        .where("parent")
        .equals(parent)
        .return.all()
    ).map((user) => user[EntityId]);
    return ids;
  }
  // static async getUsersOfAParent(parent) {
  //   const ids = await UserModel.#getUsersIdOfAParent(parent);
  //   const users = await Promise.all(ids.map((id) => UserModel.getUser(id)));
  //   return users;
  // }
  static async usernameExists(username) {
    await userRepository.createIndex();
    const count = await (await userRepository.search())
      .where("username")
      .equals(username)
      .return.count();
    return Boolean(count);
  }
  static async getUserByUsername(username) {
    await userRepository.createIndex();
    const id = (
      await (await userRepository.search())
        .where("username")
        .equals(username)
        .return.first()
    )[EntityId];
    const user = await this.getUser(id);
    return user;
  }
  get data() {
    return {
      username: this.username,
      job: this.job,
      jobSkill: this.jobSkill,
    };
  }
};
