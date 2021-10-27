const route = require("express").Router();
const {
  getUserById,
  updateUser,
  updatePass,
  getUserByName,
} = require("../controllers/users");
const { user, admin, auth } = require("../middlewares/auth");
const upload = require("../helpers/upload");

route.get("/profile", auth, user, getUserById);
route.patch("/profile", auth, user, upload, updateUser);
route.put("/profile/change_password",auth, user, updatePass);

//only manajer
route.get("/pegawai",auth, admin, getUserByName);

module.exports = route;
