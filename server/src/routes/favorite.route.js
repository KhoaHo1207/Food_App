const express = require("express");
const router = express.Router();
const {
  addFavorite,
  deleteFavorite,
  getFavorite,
} = require("../controllers/favorite.controller");
router.get("/:userId", getFavorite);
router.post("/", addFavorite);
router.delete("/:userId/:recipeId", deleteFavorite);
module.exports = router;
