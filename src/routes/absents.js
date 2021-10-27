const route = require("express").Router();
const {
  getAbsentByQuery,
  getAbsentByQueryFromId,
  deleteAbsent,
  inputAbsent,
} = require("../controllers/absents");
const { user, admin, auth } = require("../middlewares/auth");

//pegawai or manajer
route.get("/search", auth, user, getAbsentByQueryFromId);
route.post("/input", auth, user, inputAbsent);
//only manajer
route.get("/pegawai", auth, admin, getAbsentByQuery);
route.delete("/pegawai/:id", auth, admin, deleteAbsent);

module.exports = route;
