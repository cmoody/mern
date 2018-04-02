function auth(req, res, next) {
  console.log("Auth should be passed here in header");

  next();
}

module.exports = auth;