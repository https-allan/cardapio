const adminMiddleware = (req, res, next) => {
  res.locals.isAdmin = req.path.startsWith("/admin");
  next();
};

module.exports = adminMiddleware;
