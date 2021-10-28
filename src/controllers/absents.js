const {
  getAbsentByQuery,
  getAbsentByYear,
  getAbsentByMonth,
  getAbsentByDate,
  getAbsentByDateRange,
  getAbsentByQueryFromId,
  getAbsentByYearFromId,
  getAbsentByMonthFromId,
  getAbsentByDateFromId,
  getAbsentByDateRangeFromId,
  deleteAbsent,
  inputAbsent,
} = require("../models/absents");
const { response: standardResponse } = require("../helpers/standardResponse");

exports.getAbsentByQuery = (req, res) => {
  let limit = 8;
  let page = parseInt(req.query.page) || 1;
  if (
    req.query.year1 !== undefined &&
    req.query.year2 !== undefined &&
    req.query.month1 !== undefined &&
    req.query.month2 !== undefined &&
    req.query.date1 !== undefined &&
    req.query.date2 !== undefined
  ) {
    const { year1, year2, month1, month2, date1, date2 } = req.query;
    getAbsentByDateRange(
      limit,
      page,
      year1,
      month1,
      year2,
      month2,
      date1,
      date2,
      (err, results) => {
        if (!err) {
          return standardResponse(res, 200, true, "Results absents", results);
        } else {
          return standardResponse(res, 400, false, "An error occured");
        }
      }
    );
  } else {
    if (
      req.query.year !== undefined &&
      req.query.month !== undefined &&
      req.query.date !== undefined
    ) {
      const { year, month, date } = req.query;
      getAbsentByQuery(limit, page, year, month, date, (err, results) => {
        if (!err) {
          return standardResponse(res, 200, true, "Results absents", results);
        } else {
          return standardResponse(res, 400, false, "An error occured");
        }
      });
    } else if (req.query.year !== undefined) {
      const year = req.query.year;
      getAbsentByYear(limit, page, year, (err, results) => {
        if (!err) {
          return standardResponse(res, 200, true, "Results absents", results);
        } else {
          return standardResponse(res, 400, false, "An error occured");
        }
      });
    } else if (req.query.month !== undefined) {
      const month = req.query.month;
      getAbsentByMonth(limit, page, month, (err, results) => {
        if (!err) {
          return standardResponse(res, 200, true, "Results absents", results);
        } else {
          return standardResponse(res, 400, false, "An error occured");
        }
      });
    } else if (req.query.date !== undefined) {
      const date = req.query.date;
      getAbsentByDate(limit, page, date, (err, results) => {
        if (!err) {
          return standardResponse(res, 200, true, "Results absents", results);
        } else {
          return standardResponse(res, 400, false, "An error occured");
        }
      });
    } else {
      let newDate = new Date();
      let autoMonth =
        newDate.getMonth() + 1 < 10
          ? `0${newDate.getMonth() + 1}`
          : `${newDate.getMonth() + 1}`;
      let autoDate =
        newDate.getDate() < 10
          ? `0${newDate.getDate()}`
          : `${newDate.getDate()}`;
      const year = `${newDate.getFullYear()}`;
      const month = autoMonth;
      const date = autoDate;

      getAbsentByQuery(limit, page, year, month, date, (err, results) => {
        if (!err) {
          return standardResponse(res, 200, true, "Results absents", results);
        } else {
          return standardResponse(res, 400, false, "An error occured");
        }
      });
    }
  }
};

exports.getAbsentByQueryFromId = (req, res) => {
  let id = req.authUser.id;
  let limit = 8;
  let page = parseInt(req.query.page) || 1;
  if (
    req.query.year1 !== undefined &&
    req.query.year2 !== undefined &&
    req.query.month1 !== undefined &&
    req.query.month2 !== undefined &&
    req.query.date1 !== undefined &&
    req.query.date2 !== undefined
  ) {
    const { year1, year2, month1, month2, date1, date2 } = req.query;
    getAbsentByDateRangeFromId(
      id,
      limit,
      page,
      year1,
      month1,
      year2,
      month2,
      date1,
      date2,
      (err, results) => {
        if (!err) {
          return standardResponse(
            res,
            200,
            true,
            "Results absents by token",
            results
          );
        } else {
          return standardResponse(res, 400, false, "An error occured");
        }
      }
    );
  } else {
    if (
      req.query.year !== undefined &&
      req.query.month !== undefined &&
      req.query.date !== undefined
    ) {
      const { year, month, date } = req.query;
      getAbsentByQueryFromId(
        id,
        limit,
        page,
        year,
        month,
        date,
        (err, results) => {
          if (!err) {
            return standardResponse(
              res,
              200,
              true,
              "Results absents by token",
              results
            );
          } else {
            return standardResponse(res, 400, false, "An error occured");
          }
        }
      );
    } else if (req.query.year !== undefined) {
      const year = req.query.year;
      getAbsentByYearFromId(id, limit, page, year, (err, results) => {
        if (!err) {
          return standardResponse(
            res,
            200,
            true,
            "Results absents by token",
            results
          );
        } else {
          return standardResponse(res, 400, false, "An error occured");
        }
      });
    } else if (req.query.month !== undefined) {
      const month = req.query.month;
      getAbsentByMonthFromId(id, limit, page, month, (err, results) => {
        if (!err) {
          return standardResponse(
            res,
            200,
            true,
            "Results absents by token",
            results
          );
        } else {
          return standardResponse(res, 400, false, "An error occured");
        }
      });
    } else if (req.query.date !== undefined) {
      const date = req.query.date;
      getAbsentByDateFromId(id, limit, page, date, (err, results) => {
        if (!err) {
          return standardResponse(
            res,
            200,
            true,
            "Results absents by token",
            results
          );
        } else {
          return standardResponse(res, 400, false, "An error occured");
        }
      });
    } else {
      let newDate = new Date();
      let autoMonth =
        newDate.getMonth() + 1 < 10
          ? `0${newDate.getMonth() + 1}`
          : `${newDate.getMonth() + 1}`;
      let autoDate =
        newDate.getDate() < 10
          ? `0${newDate.getDate()}`
          : `${newDate.getDate()}`;
      const year = `${newDate.getFullYear()}`;
      const month = autoMonth;
      const date = autoDate;

      getAbsentByQueryFromId(
        id,
        limit,
        page,
        year,
        month,
        date,
        (err, results) => {
          if (!err) {
            return standardResponse(
              res,
              200,
              true,
              "Results absents by token",
              results
            );
          } else {
            return standardResponse(res, 400, false, "An error occured");
          }
        }
      );
    }
  }
};

exports.deleteAbsent = (req, res) => {
  const { id: stringId } = req.params;
  const id = parseInt(stringId);
  deleteAbsent(id, (err, results) => {
    if (!err) {
      return standardResponse(res, 200, true, "Success Delete Absent");
    } else {
      return standardResponse(res, 400, false, "An error occured");
    }
  });
};

exports.inputAbsent = (req, res) => {
  let { type } = req.query;
  let id = req.authUser.id;
  if (type === "masuk") {
    let date = new Date();
    let autoMonth =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`;
    let autoDate =
      date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

    let masuk1 = `${date.getFullYear()}-${autoMonth}-${autoDate} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    console.log(masuk1);
    let masuk2 = `${date.getFullYear()}-${autoMonth}-${autoDate}`
    let absen = new Date(`28/10/2021, 14:27:03`);
    let jadwal = new Date(`28/10/2021, 08:00:00`);
    let diffMs = jadwal - absen;
    console.log(diffMs);
    let diffDays = Math.floor(diffMs / 86400000);
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    if (diffHrs < 0) {
      console.log(
        "Terlambat " +
          Math.abs(diffHrs) +
          " Jam, " +
          Math.abs(diffMins) +
          " Menit"
      );
    } else if (diffHrs >= 0) {
      console.log("Tepat Waktu");
    }
    // let date = new Date();
    // let autoMonth =
    //   date.getMonth() + 1 < 10
    //     ? `0${date.getMonth() + 1}`
    //     : `${date.getMonth() + 1}`;
    // let autoDate =
    //   date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    // let absen1 = `${date.getFullYear()}-${autoMonth}-${autoDate} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    // let masuk = `${date.getFullYear()}-${autoMonth}-${autoDate}`;
    // let absen = new Date(`${absen1}`);
    // let jadwal = new Date(`${masuk} 08:00:00`);
    // let diffMs = jadwal - absen;
    // let diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    // console.log(diffHrs);
    // let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    // if (diffHrs < 0) {
    //   const late = `Terlambat ${Math.abs(diffHrs)} jam, ${Math.abs(
    //     diffMins
    //   )} menit`;
    //   console.log(id, type, late);
    //   inputAbsent(id, type, late, (err, results) => {
    //     if (!err) {
    //       return standardResponse(res, 200, true, "Success Input Absent");
    //     } else {
    //       return standardResponse(res, 400, false, "An error occured");
    //     }
    //   });
    // } else if (diffHrs >= 0) {
    //   const late = "Tepat waktu";
    //   console.log(id, type, late);
    //   inputAbsent(id, type, late, (err, results) => {
    //     if (!err) {
    //       return standardResponse(res, 200, true, "Success Input Absent");
    //     } else {
    //       return standardResponse(res, 400, false, "An error occured");
    //     }
    //   });
    // }
  } else if (type === "pulang") {
    const late = "-";
    inputAbsent(id, type, late, (err, results) => {
      if (!err) {
        return standardResponse(res, 200, true, "Success Input Absent");
      } else {
        return standardResponse(res, 400, false, "An error occured");
      }
    });
  }
};
