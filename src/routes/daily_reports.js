const route = require("express").Router();
const {
  getDailyByQuery,
  getDailyByQueryFromId,
  deleteDaily,
  inputDaily,
  updateDaily
} = require("../controllers/daily_reports");
const { user, admin, auth } = require("../middlewares/auth");

//pegawai or manajer
route.get("/search", auth, user, getDailyByQueryFromId);
route.post("/input", auth, user, inputDaily);
route.patch("/:id", auth, user, updateDaily);
route.delete("/:id", auth, user, deleteDaily);
//only manajer
route.get("/pegawai", auth, admin, getDailyByQuery);

module.exports = route;
