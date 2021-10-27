exports.response = (res, status, success, message, results, pageInfo) => {
  const returnData = {
    success,
    message,
    pageInfo,
  };
  if (status >= 400) {
    returnData.success = false;
  } else {
    status = 200;
  }
  if (results !== null) {
    returnData.results = results;
  }
  return res.status(status).json(returnData);
};
