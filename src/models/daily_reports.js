const db = require("../helpers/db");

exports.getDailyByQuery = (limit, page, year, month, date, cb) => {
  const offset = limit * page - limit;
  db.query(
    `
    SELECT daily_reports.id, users.name, users.photo, daily_reports.description, daily_reports.date from daily_reports INNER JOIN users ON daily_reports.id_user = users.id WHERE daily_reports.date >= '${year}-${month}-${date}' AND daily_reports.date <= '${year}-${month}-${date}' ORDER BY daily_reports.id DESC LIMIT ? OFFSET ?
    `,
    [limit, offset],
    cb
  );
};

exports.getDailyByDateRange = (
  limit,
  page,
  year1,
  month1,
  year2,
  month2,
  date1,
  date2,
  cb
) => {
  const offset = limit * page - limit;
  console.log(year1, month1);
  db.query(
    `
      SELECT daily_reports.id, users.name, users.photo, daily_reports.description, daily_reports.date from  daily_reports INNER JOIN users ON daily_reports.id_user = users.id WHERE daily_reports.date >= '${year1}-${month1}-${date1}' AND daily_reports.date <= '${year2}-${month2}-${date2}' ORDER BY daily_reports.id DESC LIMIT ? OFFSET ?
      `,
    [limit, offset],
    cb
  );
};

exports.getDailyByYear = (limit, page, year, cb) => {
  const offset = limit * page - limit;
  db.query(
    `
      SELECT daily_reports.id, users.name, users.photo, daily_reports.description, daily_reports.date from daily_reports INNER JOIN users ON daily_reports.id_user = users.id WHERE daily_reports.date >= '${year}-01-01' AND daily_reports.date <= '${year}-12-31' ORDER BY daily_reports.id DESC LIMIT ? OFFSET ?
      `,
    [limit, offset],
    cb
  );
};

exports.getDailyByMonth = (limit, page, month, cb) => {
  const newDate = new Date();
  const offset = limit * page - limit;
  db.query(
    `
      SELECT daily_reports.id, users.name, users.photo, daily_reports.description, daily_reports.date from daily_reports INNER JOIN users ON daily_reports.id_user = users.id WHERE daily_reports.date >= '${newDate.getFullYear()}-${month}-01' AND daily_reports.date <= '${newDate.getFullYear()}-${month}-31' ORDER BY daily_reports.id DESC LIMIT ? OFFSET ?
      `,
    [limit, offset],
    cb
  );
};

exports.getDailyByDate = (limit, page, date, cb) => {
  const newDate = new Date();
  let autoMonth =
    newDate.getMonth() + 1 < 10
      ? `0${newDate.getMonth() + 1}`
      : `${newDate.getMonth() + 1}`;
  const offset = limit * page - limit;
  db.query(
    `
        SELECT daily_reports.id, users.name, users.photo, daily_reports.description, daily_reports.date from daily_reports INNER JOIN users ON daily_reports.id_user = users.id WHERE daily_reports.date >= '${newDate.getFullYear()}-${autoMonth}-${date}' AND daily_reports.date <= '${newDate.getFullYear()}-${autoMonth}-${date}' ORDER BY daily_reports.id DESC LIMIT ? OFFSET ?
        `,
    [limit, offset],
    cb
  );
};

exports.getDailyByQueryFromId = (id, limit, page, year, month, date, cb) => {
  const offset = limit * page - limit;
  db.query(
    `
      SELECT daily_reports.id, users.name, users.photo, daily_reports.description, daily_reports.date from daily_reports INNER JOIN users ON daily_reports.id_user = users.id WHERE daily_reports.date >= '${year}-${month}-${date}' AND daily_reports.date <= '${year}-${month}-${date}' AND users.id=${id} ORDER BY daily_reports.id DESC LIMIT ? OFFSET ?
      `,
    [limit, offset],
    cb
  );
};

exports.getDailyByDateRangeFromId = (
  id,
  limit,
  page,
  year1,
  month1,
  year2,
  month2,
  date1,
  date2,
  cb
) => {
  const offset = limit * page - limit;
  console.log(year1, month1);
  db.query(
    `
        SELECT daily_reports.id, users.name, users.photo, daily_reports.description, daily_reports.date from daily_reports INNER JOIN users ON daily_reports.id_user = users.id WHERE daily_reports.date >= '${year1}-${month1}-${date1}' AND daily_reports.date <= '${year2}-${month2}-${date2}' AND users.id=${id} ORDER BY daily_reports.id DESC LIMIT ? OFFSET ?
        `,
    [limit, offset],
    cb
  );
};

exports.getDailyByYearFromId = (id, limit, page, year, cb) => {
  const offset = limit * page - limit;
  db.query(
    `
        SELECT daily_reports.id, users.name, users.photo, daily_reports.description, daily_reports.date from daily_reports INNER JOIN users ON daily_reports.id_user = users.id WHERE daily_reports.date >= '${year}-01-01' AND daily_reports.date <= '${year}-12-31' AND users.id=${id} ORDER BY daily_reports.id DESC LIMIT ? OFFSET ?
        `,
    [limit, offset],
    cb
  );
};

exports.getDailyByMonthFromId = (id, limit, page, month, cb) => {
  const newDate = new Date();
  const offset = limit * page - limit;
  db.query(
    `
        SELECT daily_reports.id, users.name, users.photo, daily_reports.description, daily_reports.date from daily_reports INNER JOIN users ON daily_reports.id_user = users.id WHERE daily_reports.date >= '${newDate.getFullYear()}-${month}-01' AND daily_reports.date <= '${newDate.getFullYear()}-${month}-31' AND users.id=${id} ORDER BY daily_reports.id DESC LIMIT ? OFFSET ?
        `,
    [limit, offset],
    cb
  );
};

exports.getDailyByDateFromId = (id, limit, page, date, cb) => {
  const newDate = new Date();
  let autoMonth =
    newDate.getMonth() + 1 < 10
      ? `0${newDate.getMonth() + 1}`
      : `${newDate.getMonth() + 1}`;
  const offset = limit * page - limit;
  db.query(
    `
          SELECT daily_reports.id, users.name, users.photo, daily_reports.description, daily_reports.date from daily_reports INNER JOIN users ON daily_reports.id_user = users.id WHERE daily_reports.date >= '${newDate.getFullYear()}-${autoMonth}-${date}' AND daily_reports.date <= '${newDate.getFullYear()}-${autoMonth}-${date}' AND users.id=${id} ORDER BY daily_reports.id DESC LIMIT ? OFFSET ?
          `,
    [limit, offset],
    cb
  );
};

exports.deleteDaily = (id, cb) => {
  db.query(
    `
      DELETE FROM daily_reports WHERE id=?
    `,
    [id],
    cb
  );
};

exports.inputDaily = (id, date, desc, cb) => {
  db.query(
    `
    INSERT INTO daily_reports(id_user, date, description)VALUES (?,?,?)
      `,
    [id, date, desc],
    cb
  );
};

exports.updateDaily = (data, id, cb) => {
  db.query(`UPDATE daily_reports SET ? WHERE id = ?`, [data, id], cb);
};
