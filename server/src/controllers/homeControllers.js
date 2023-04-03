import db from "../models/index";
import * as homeServices from "../services/homeServices";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.send(data);
  } catch (e) {
    console.log(e);
  }
};
let createUser = async (req, res) => {
  let message = await homeServices.createNewUser(req.body);
  return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  let id = req.query.id;
  let message = await homeServices.handleDeleteUser(id);
  return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
  let message = await homeServices.handleUpdateUser(req.body);
  return res.status(200).json(message);
};

export { getHomePage, createUser, handleDeleteUser, handleEditUser };
