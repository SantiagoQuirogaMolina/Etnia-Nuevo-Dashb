const express = require('express');
const findAllDeleted = require('../controllers/deletedController');

const getAllDeleted = async (req, res) => {
  try { 
    const deletedRecords = await findAllDeleted();

    res.json(deletedRecords);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getAllDeleted;