const route = require("express").Router();
const authController = require("../controllers/auth");

route.post("/register", authController.register);
route.post("/login", authController.login);

module.exports = route;
