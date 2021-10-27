const {
  getDailyByQuery,
  getDailyByYear,
  getDailyByMonth,
  getDailyByDate,
  getDailyByDateRange,
  getDailyByQueryFromId,
  getDailyByYearFromId,
  getDailyByMonthFromId,
  getDailyByDateFromId,
  getDailyByDateRangeFromId,
  deleteDaily,
  inputDaily,
  updateDaily,
} = require("../models/daily_reports");
const { response: standardResponse } = require("../helpers/standardResponse");

exports.getDailyByQuery = (req, res) => {
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
    if (
      req.query.year1 !== "" &&
      req.query.year2 !== "" &&
      req.query.month1 !== "" &&
      req.query.month2 !== "" &&
      req.query.date1 !== "" &&
      req.query.date2 !== ""
    ) {
      console.log(req.query);
    } else {
      const { year1, year2, month1, month2, date1, date2 } = req.query;
      getDailyByDateRange(
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
              "Results daily reports",
              results
            );
          } else {
            return standardResponse(res, 400, false, "An error occured");
          }
        }
      );
    }
  } else {
    if (
      req.query.year !== undefined &&
      req.query.month !== undefined &&
      req.query.date !== undefined
    ) {
      const { year, month, date } = req.query;
      getDailyByQuery(limit, page, year, month, date, (err, results) => {
        if (!err) {
          return standardResponse(
            res,
            200,
            true,
            "Results daily reports",
            results
          );
        } else {
          return standardResponse(res, 400, false, "An error occured");
        }
      });
    } else if (req.query.year !== undefined) {
      const year = req.query.year;
      getDailyByYear(limit, page, year, (err, results) => {
        if (!err) {
          return standardResponse(
            res,
            200,
            true,
            "Results daily reports",
            results
          );
        } else {
          return standardResponse(res, 400, false, "An error occured");
        }
      });
    } else if (req.query.month !== undefined) {
      const month = req.query.month;
      getDailyByMonth(limit, page, month, (err, results) => {
        if (!err) {
          return standardResponse(
            res,
            200,
            true,
            "Results daily reports",
            results
          );
        } else {
          return standardResponse(res, 400, false, "An error occured");
        }
      });
    } else if (req.query.date !== undefined) {
      const date = req.query.date;
      getDailyByDate(limit, page, date, (err, results) => {
        if (!err) {
          return standardResponse(
            res,
            200,
            true,
            "Results daily reports",
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

      getDailyByQuery(limit, page, year, month, date, (err, results) => {
        if (!err) {
          return standardResponse(
            res,
            200,
            true,
            "Results daily reports",
            results
          );
        } else {
          return standardResponse(res, 400, false, "An error occured");
        }
      });
    }
  }
};

exports.getDailyByQueryFromId = (req, res) => {
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
    getDailyByDateRangeFromId(
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
            "Results daily reports by token",
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
      getDailyByQueryFromId(
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
              "Results daily reports by token",
              results
            );
          } else {
            return standardResponse(res, 400, false, "An error occured");
          }
        }
      );
    } else if (req.query.year !== undefined) {
      const year = req.query.year;
      getDailyByYearFromId(id, limit, page, year, (err, results) => {
        if (!err) {
          return standardResponse(
            res,
            200,
            true,
            "Results daily reports by token",
            results
          );
        } else {
          return standardResponse(res, 400, false, "An error occured");
        }
      });
    } else if (req.query.month !== undefined) {
      const month = req.query.month;
      getDailyByMonthFromId(id, limit, page, month, (err, results) => {
        if (!err) {
          return standardResponse(
            res,
            200,
            true,
            "Results daily reports by token",
            results
          );
        } else {
          return standardResponse(res, 400, false, "An error occured");
        }
      });
    } else if (req.query.date !== undefined) {
      const date = req.query.date;
      getDailyByDateFromId(id, limit, page, date, (err, results) => {
        if (!err) {
          return standardResponse(
            res,
            200,
            true,
            "Results daily reports by token",
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

      getDailyByQueryFromId(
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
              "Results daily reports by token",
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

exports.deleteDaily = (req, res) => {
  const { id: stringId } = req.params;
  const id = parseInt(stringId);
  deleteDaily(id, (err, results) => {
    if (!err) {
      return standardResponse(res, 200, true, "Success Delete Daily reports");
    } else {
      return standardResponse(res, 400, false, "An error occured");
    }
  });
};

exports.inputDaily = (req, res) => {
  const body = req.body;
  const id = req.authUser.id;
  let newDate = new Date();
  let autoMonth =
    newDate.getMonth() + 1 < 10
      ? `0${newDate.getMonth() + 1}`
      : `${newDate.getMonth() + 1}`;
  let autoDate =
    newDate.getDate() < 10 ? `0${newDate.getDate()}` : `${newDate.getDate()}`;
  const date = `${newDate.getFullYear()}-${autoMonth}-${autoDate}`;
  inputDaily(id, date, body.desc, (err, results) => {
    if (!err) {
      return standardResponse(res, 200, true, "Success Insert Daily reports");
    } else {
      return standardResponse(res, 400, false, "An error occured");
    }
  });
};

exports.updateDaily = (req, res) => {
  const { id: stringId } = req.params;
  const id = parseInt(stringId);
  const data = req.body;
  updateDaily(data, id, (err, results) => {
    if (!err) {
      return standardResponse(res, 200, true, "Success Update Daily reports");
    } else {
      return standardResponse(res, 400, false, "An error occured");
    }
  });
};
