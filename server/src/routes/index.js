const favoriteRoute = require("./favorite.route");
const initRoute = (app) => {
  app.use("/api/favorites", favoriteRoute);
};

module.exports = initRoute;
