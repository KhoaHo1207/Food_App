const { db } = require("../config/db");
const { favoritesTable } = require("../db/schema");
const { and, eq } = require("drizzle-orm");
const addFavorite = async (req, res) => {
  try {
    const { userId, recipeId, title, cookTime, servings, image } = req.body;

    if (!userId || !recipeId || !title) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Missing required fields",
      });
    }

    const newFavorite = await db.insert(favoritesTable).values({
      userId,
      recipeId,
      title,
      image,
      cookTime,
      servings,
    });

    return res.status(201).json({
      status: 201,
      success: true,
      message: "Favorite added successfully",
      data: newFavorite[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "InterVal Server Error",
    });
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    await db
      .delete(favoritesTable)
      .where(
        and(
          eq(favoritesTable.userId, userId),
          eq(favoritesTable.recipeId, parseInt(recipeId))
        )
      );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Favorite deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Inter Server Error",
    });
  }
};

const getFavorite = async (req, res) => {
  try {
    const { userId } = req.params;

    const favorites = await db
      .select()
      .from(favoritesTable)
      .where(eq(favoritesTable.userId, userId));

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Favorites fetched successfully",
      data: favorites,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { addFavorite, deleteFavorite, getFavorite };
