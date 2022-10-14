const { Item } = require("../models");

// Read All Items
const items = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
    items
};
