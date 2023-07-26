import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export function ValidatePassword(passwordEN, password) {
  // console.log(bcrypt.compareSync(password, passwordEN));
  return bcrypt.compareSync(password, passwordEN);
}
export function encryptPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
