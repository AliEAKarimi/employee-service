module.exports = class UserModel {
  constructor(id, data, parent) {
    this.id = id;
    this.data = data;
    this.parent = parent;
  }
  async save(dataDatabase, parentDatabase) {
    const result = await Promise.allSettled([
      dataDatabase.save(this.id, JSON.stringify(this.data)),
      parentDatabase.save(this.id, this.parent),
    ]);
  }
  async update(dataDatabase, parentDatabase, newData, newParent, newUsername) {
    const userData = JSON.parse(JSON.stringify(this.data));
    Object.deepExtend(userData, newData);
    if (newUsername) {
      const oldUsername = this.id;
      this.id = newUsername;
      this.data = userData;
      this.parent = newParent ?? this.parent;
      await this.save(dataDatabase, parentDatabase);
      await UserModel.delete(dataDatabase, parentDatabase, oldUsername);
    } else {
      await Promise.all([
        dataDatabase.update(this.id, JSON.stringify(userData)),
        newParent
          ? parentDatabase.update(this.id, newParent)
          : Promise.resolve(),
      ]);
    }
  }

  static async delete(dataDatabase, parentDatabase, id) {
    const result = await Promise.all([
      dataDatabase.delete(id),
      parentDatabase.delete(id),
    ]);
  }

  static async getUser(dataDatabase, parentDatabase, id) {
    const [data, parent] = await Promise.all([
      UserModel.#getValue(dataDatabase, id, { parse: true }),
      UserModel.#getValue(parentDatabase, id),
    ]);
    return new UserModel(id, data, parent);
  }
  static async #getValue(database, id, { parse } = { parse: false }) {
    const value = await database.get(id);
    return parse ? JSON.parse(value) : value;
  }
  static async exists(database, id) {
    return await database.exists(id);
  }
};
