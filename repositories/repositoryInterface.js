module.exports = class RepositoryInterface {
  async save(id, data) {
    throw new Error("Not implemented");
  }
  async remove(id) {
    throw new Error("Not implemented");
  }
  async fetch(id) {
    throw new Error("Not implemented");
  }
  async exists(id) {
    throw new Error("Not implemented");
  }
  async createIndex() {
    throw new Error("Not implemented");
  }
  async search() {
    throw new Error("Not implemented");
  }
};
