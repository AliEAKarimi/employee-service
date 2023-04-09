module.exports = class UserModel {
  constructor(idNumber, data, parent) {
    this.idNumber = idNumber;
    this.data = data;
    this.parent = parent;
  }
  async save(dataDatabase, parentDatabase) {
    await Promise.allSettled([
      this.#saveValue(dataDatabase, this.data, { stringify: true }),
      this.#saveValue(parentDatabase, this.parent),
    ]);
  }
  async #saveValue(database, value, { stringify } = { stringify: false }) {
    await database.save(
      this.idNumber,
      stringify ? JSON.stringify(value) : value
    );
  }
  async update(dataDatabase, parentDatabase, newData, newParent) {
    await Promise.all([
      this.#updateValue(dataDatabase, newData, { stringify: true }),
      this.#updateValue(parentDatabase, newParent),
    ]);
  }
  async #updateValue(database, newValue, { stringify } = { stringify: false }) {
    await database.update(
      this.idNumber,
      stringify ? JSON.stringify(newValue) : newValue
    );
  }
  async delete(dataDatabase, parentDatabase) {
    await Promise.all([
      dataDatabase.delete(this.idNumber),
      parentDatabase.delete(this.idNumber),
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
