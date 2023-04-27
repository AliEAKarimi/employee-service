const userRepository = require("../repositories/userRepository");
const parentRepository = require("../repositories/parentRepository");
const { EntityId } = require("redis-om");

module.exports = class UserModel {
  constructor(id, { jobSkill, job, idNumber }, parent) {
    this.id = id;
    this.jobSkill = jobSkill;
    this.job = job;
    this.idNumber = idNumber;
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
  async update(newData, newParent, newUsername) {
    const userData = this.data;
    Object.deepExtend(userData, newData);
    userData.job = JSON.stringify(userData.job);
    await Promise.all([
      userRepository.save(`${newUsername ?? this.id}`, userData),
      parentRepository.save(`${newUsername ?? this.id}`, {
        parent: newParent ?? this.parent,
      }),
    ]);
  }

  static async delete(id) {
    await Promise.all([
      userRepository.remove(`${id}`),
      parentRepository.remove(`${id}`),
    ]);
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
  static async getUsersOfAParent(parent) {
    await parentRepository.createIndex();
    const ids = (
      await (await parentRepository.search())
        .where("parent")
        .equals(parent)
        .return.all()
    ).map((user) => user[EntityId]);
    return ids;
  }
  get data() {
    return {
      idNumber: this.idNumber,
      job: this.job,
      jobSkill: this.jobSkill,
    };
  }
};
