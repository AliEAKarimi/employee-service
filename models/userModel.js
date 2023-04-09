module.exports = class UserModel {
  constructor(idNumber, data, parent) {
    this.idNumber = idNumber;
    this.data = data;
    this.parent = parent;
  }
  async save(dataDatabase, parentDatabase) {
    const result = await Promise.allSettled([
      dataDatabase.save(this.idNumber, JSON.stringify(this.data)),
      parentDatabase.save(this.idNumber, this.parent),
    ]);
  }
  async update(dataDatabase, parentDatabase, newData, newParent) {
    await Promise.all([
      dataDatabase.update(this.idNumber, JSON.stringify(newData)),
      parentDatabase.update(this.idNumber, newParent),
    ]);
  }

  async delete(dataDatabase, parentDatabase) {
    await Promise.all([
      dataDatabase.delete(this.idNumber),
      parentDatabase.delete(JSON.stringify(this.idNumber)),
    ]);
  }

  static async getUser(dataDatabase, parentDatabase, idNumber) {
    const [data, parent] = await Promise.all([
      UserModel.#getValue(dataDatabase, idNumber, { parse: true }),
      UserModel.#getValue(parentDatabase, idNumber),
    ]);
    return new UserModel(idNumber, data, parent);
  }
  static async #getValue(database, idNumber, { parse } = { parse: false }) {
    const value = await database.get(idNumber);
    return parse ? JSON.parse(value) : value;
  }
  static async exists(database, idNumber) {
    return await database.exists(idNumber);
  }
};
