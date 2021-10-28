const db = require("../helpers/db");
const { promisify } = require("util");
const execPromise = promisify(db.query).bind(db);

exports.getAbsentByQuery = (limit, page, year, month, date, cb) => {
  const offset = limit * page - limit;
  db.query(
    `
    SELECT absents.id, users.name, users.photo, absents.absent, absents.type, absents.late from absents INNER JOIN users ON absents.id_user = users.id WHERE absents.absent >= '${year}-${month}-${date} 00:00:00' AND absents.absent <= '${year}-${month}-${date} 23:59:59' ORDER BY absents.id DESC LIMIT ? OFFSET ?
    `,
    [limit, offset],
    cb
  );
};

exports.getAbsentByDateRange = (
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
      SELECT absents.id, users.name, users.photo, absents.absent, absents.type, absents.late from absents INNER JOIN users ON absents.id_user = users.id WHERE absents.absent >= '${year1}-${month1}-${date1} 00:00:00' AND absents.absent <= '${year2}-${month2}-${date2} 23:59:59' ORDER BY absents.id DESC LIMIT ? OFFSET ?
      `,
    [limit, offset],
    cb
  );
};

exports.getAbsentByYear = (limit, page, year, cb) => {
  const offset = limit * page - limit;
  db.query(
    `
      SELECT absents.id, users.name, users.photo, absents.absent, absents.type, absents.late from absents INNER JOIN users ON absents.id_user = users.id WHERE absents.absent >= '${year}-01-01 00:00:00' AND absents.absent <= '${year}-12-31 23:59:59' ORDER BY absents.id DESC LIMIT ? OFFSET ?
      `,
    [limit, offset],
    cb
  );
};

exports.getAbsentByMonth = (limit, page, month, cb) => {
  const newDate = new Date();
  const offset = limit * page - limit;
  db.query(
    `
      SELECT absents.id, users.name, users.photo, absents.absent, absents.type, absents.late from absents INNER JOIN users ON absents.id_user = users.id WHERE absents.absent >= '${newDate.getFullYear()}-${month}-01 00:00:00' AND absents.absent <= '${newDate.getFullYear()}-${month}-31 23:59:59' ORDER BY absents.id DESC LIMIT ? OFFSET ?
      `,
    [limit, offset],
    cb
  );
};

exports.getAbsentByDate = (limit, page, date, cb) => {
  const newDate = new Date();
  let autoMonth =
    newDate.getMonth() + 1 < 10
      ? `0${newDate.getMonth() + 1}`
      : `${newDate.getMonth() + 1}`;
  const offset = limit * page - limit;
  db.query(
    `
        SELECT absents.id, users.name, users.photo, absents.absent, absents.type, absents.late from absents INNER JOIN users ON absents.id_user = users.id WHERE absents.absent >= '${newDate.getFullYear()}-${autoMonth}-${date} 00:00:00' AND absents.absent <= '${newDate.getFullYear()}-${autoMonth}-${date} 23:59:59' ORDER BY absents.id DESC LIMIT ? OFFSET ?
        `,
    [limit, offset],
    cb
  );
};

exports.getAbsentByQueryFromId = (id, limit, page, year, month, date, cb) => {
  const offset = limit * page - limit;
  db.query(
    `
      SELECT absents.id, users.name, users.photo, absents.absent, absents.type, absents.late from absents INNER JOIN users ON absents.id_user = users.id WHERE absents.absent >= '${year}-${month}-${date} 00:00:00' AND absents.absent <= '${year}-${month}-${date} 23:59:59' AND users.id=${id} ORDER BY absents.id DESC LIMIT ? OFFSET ?
      `,
    [limit, offset],
    cb
  );
};

exports.getAbsentByDateRangeFromId = (
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
        SELECT absents.id, users.name, users.photo, absents.absent, absents.type, absents.late from absents INNER JOIN users ON absents.id_user = users.id WHERE absents.absent >= '${year1}-${month1}-${date1} 00:00:00' AND absents.absent <= '${year2}-${month2}-${date2} 23:59:59' AND users.id=${id} ORDER BY absents.id DESC LIMIT ? OFFSET ?
        `,
    [limit, offset],
    cb
  );
};

exports.getAbsentByYearFromId = (id, limit, page, year, cb) => {
  const offset = limit * page - limit;
  db.query(
    `
        SELECT absents.id, users.name, users.photo, absents.absent, absents.type, absents.late from absents INNER JOIN users ON absents.id_user = users.id WHERE absents.absent >= '${year}-01-01 00:00:00' AND absents.absent <= '${year}-12-31 23:59:59' AND users.id=${id} ORDER BY absents.id DESC LIMIT ? OFFSET ?
        `,
    [limit, offset],
    cb
  );
};

exports.getAbsentByMonthFromId = (id, limit, page, month, cb) => {
  const newDate = new Date();
  const offset = limit * page - limit;
  db.query(
    `
        SELECT absents.id, users.name, users.photo, absents.absent, absents.type, absents.late from absents INNER JOIN users ON absents.id_user = users.id WHERE absents.absent >= '${newDate.getFullYear()}-${month}-01 00:00:00' AND absents.absent <= '${newDate.getFullYear()}-${month}-31 23:59:59' AND users.id=${id} ORDER BY absents.id DESC LIMIT ? OFFSET ?
        `,
    [limit, offset],
    cb
  );
};

exports.getAbsentByDateFromId = (id, limit, page, date, cb) => {
  const newDate = new Date();
  let autoMonth =
    newDate.getMonth() + 1 < 10
      ? `0${newDate.getMonth() + 1}`
      : `${newDate.getMonth() + 1}`;
  const offset = limit * page - limit;
  db.query(
    `
          SELECT absents.id, users.name, users.photo, absents.absent, absents.type, absents.late from absents INNER JOIN users ON absents.id_user = users.id WHERE absents.absent >= '${newDate.getFullYear()}-${autoMonth}-${date} 00:00:00' AND absents.absent <= '${newDate.getFullYear()}-${autoMonth}-${date} 23:59:59' AND users.id=${id} ORDER BY absents.id DESC LIMIT ? OFFSET ?
          `,
    [limit, offset],
    cb
  );
};

exports.deleteAbsent = (id, cb) => {
  db.query(
    `
      DELETE FROM absents WHERE id=?
    `,
    [id],
    cb
  );
};

exports.inputAbsent = (id, type, late, cb) => {
  db.query(
    `
    INSERT INTO absents(id_user, type, late) VALUES (?,?,?)
      `,
    [id, type, late],
    cb
  );
};

exports.inputAbsentPulang = (id, type, late, absent, cb) => {
  db.query(
    `
    INSERT INTO absents(id_user, type, late, absent) VALUES (?,?,?,?)
      `,
    [id, type, late, absent],
    cb
  );
};