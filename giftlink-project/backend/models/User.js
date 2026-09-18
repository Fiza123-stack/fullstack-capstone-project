// Using the native MongoDB driver rather than an ODM,
// so this file documents the shape of a "users" collection document:
//
// {
//   _id: ObjectId,
//   firstName: String,
//   lastName: String,
//   email: String,
//   password: String (hashed with bcrypt),
//   createdAt: Date
// }

module.exports = {};
