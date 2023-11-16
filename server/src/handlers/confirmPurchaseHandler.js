const express = require('express');
const confirmPurchase = require('../controllers/confirmPurchase');

const confirmPurchaseHandler = async (req, res) => {
  const { id } = req.params;
  console.log("aqui deberia haber un mail" + id);
  
  try { 
    await confirmPurchase(id);
    
    // Send a success response
    res.status(200).json({ message: 'Purchase confirmed successfully' });
  } catch (error) {
    // Send an error response
    res.status(400).json({ error: error.message });
  }
};

module.exports = confirmPurchaseHandler;