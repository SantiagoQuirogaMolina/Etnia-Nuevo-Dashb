const express = require('express');
const findAllDeleteduser = require('../controllers/deleteUserController');

const getAllDeletedUser = async (req, res) => {
  try { 
    const deletedRecords = await findAllDeleteduser();

    res.json(deletedRecords);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getAllDeletedUser;