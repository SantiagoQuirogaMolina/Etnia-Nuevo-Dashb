indexRouter= require("express").Router();

const productsRouter = require("./productsRoute");
const userRouter = require("./usersRouter");
const emailRouter = require("./emailRouter");
const favsRouter = require("./favoritesRoute");
const cartRouter = require("./cartRouter");
const mercadoRouter = require("./mercadoRoute");
const tablesRouter = require("./tablesRouter");
const reviewsRouter = require("./reviewsRouter");
const deletedRouter = require("./deletedRouter")
const confirmPurchaseHandler = require("../handlers/confirmPurchaseHandler")


indexRouter.use("/products", productsRouter);
indexRouter.use("/users", userRouter);
indexRouter.use("/email", emailRouter);
indexRouter.use("/favs", favsRouter);
indexRouter.use("/cart", cartRouter);
indexRouter.use("/purchase", mercadoRouter);
indexRouter.use("/tables", tablesRouter);
indexRouter.use("/reviews", reviewsRouter);
indexRouter.use("/deletedElements", deletedRouter);
indexRouter.use("/confirmPurchase", confirmPurchaseHandler);

module.exports = indexRouter;
