class ResourceNotFoundError extends Error {
   constructor(id) {
      super(`Resource ${id} not found.`);
   }
}
module.exports = {
   ResourceNotFoundError
}