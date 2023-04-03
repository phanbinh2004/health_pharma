import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkEmail = await checkUserEmail(data.email);
      if (checkEmail) {
        resolve({
          errCode: 1,
          message: "Your email is exsit, Plz try other email",
        });
      } else {
        let hashPasswordFromBcrypt = await hasUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          fullName: data.fullName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.roleId,
        });
        resolve({
          errCode: 0,
          errMessage: "OK create new user success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let hasUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
let handleDeleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      if (!user) {
        resolve({
          errCode: 1,
          message: "User is't exist",
        });
      }
      await db.User.destroy({
        where: { id: id },
      });
      resolve({
        errCode: 0,
        message: "Delete success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let handleUpdateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "Invalid required parameter",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        (user.fullName = data.fullName),
          (user.phoneNumber = data.phoneNumber),
          (user.gender = data.gender),
          (user.address = data.address),
          (user.roleId = data.roleId),
          await user.save();
        resolve({
          errCode: 0,
          message: "Update success!",
        });
      } else {
        resolve({
          errCode: 1,
          message: "User is't exist",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
export { createNewUser, handleDeleteUser, handleUpdateUser };
