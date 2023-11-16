deletedRouter = require("express").Router();
const getAllDeleted = require("../handlers/deletedHandler");

deletedRouter.get('/', getAllDeleted)
    
  
  module.exports = deletedRouter;