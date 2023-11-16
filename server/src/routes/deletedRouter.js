deletedRouter = require("express").Router();
const getAllDeleted = require("../handlers/deletedHandler");
const getAllDeletedUser = require("../handlers/deletedHandlerUser");


deletedRouter.get("/", getAllDeleted);
deletedRouter.get("/Users", getAllDeletedUser);


module.exports = deletedRouter;
