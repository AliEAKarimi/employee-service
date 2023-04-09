module.exports = class UserModel {
  constructor(idNumber, data, parent) {
    this.idNumber = idNumber;
    this.data = data;
    this.parent = parent;
  }
  async save(dataDatabase, parentDatabase) {
    const result = await Promise.allSettled([
      dataDatabase.save(
        JSON.stringify(this.idNumber),
        JSON.stringify(this.data)
      ),
      parentDatabase.save(
        JSON.stringify(this.idNumber),
        JSON.stringify(this.parent)
      ),
    ]);
    console.log(result, "result");
  }
  async update(dataDatabase, parentDatabase, newData, newParent) {
    await Promise.all([
      dataDatabase.update(
        JSON.stringify(this.idNumber),
        JSON.stringify(newData)
      ),
      parentDatabase.update(
        JSON.stringify(this.idNumber),
        JSON.stringify(newParent)
      ),
    ]);
  }

  async delete(dataDatabase, parentDatabase) {
    await Promise.all([
      dataDatabase.delete(JSON.stringify(this.idNumber)),
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
