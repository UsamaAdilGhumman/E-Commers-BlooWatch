const { Order, Item } = require("../models");
const { Op } = require("sequelize");

// Read Cart Data with userID
const readCartDataWithuserid = async (req, res) => {
  const userId = req.params.id;
  // console.log(userId);
  try {
    const orders = await Order.findAll({
      where: { status: "incomplete", userId },
    });
    const orderId = orders[0].id;
    const allItems = await Item.findAll({
      include: "products",
      where: { orderId },
    });

    res.send(allItems);
    // console.log(orders[0].id);
    // console.log(allItems);
  } catch (error) {
    console.log(error);
  }
};

// delete cart

const deleteCart = async (req, res) => {
  const userId = req.params.id;
  const { id } = req.body;
  console.log(req.body);
  console.log(userId);
  // console.log(userId,"====",id);
  try {
    const orders = await Order.findAll({
      where: { status: "incomplete", userId },
    });
    console.log(orders);
    const orderId = orders[0].id;
    const delItem = await Item.destroy({
      where: { orderId, id },
    });
    if (delItem) {
      res.send({ status: "success", message: "Delete SuccessFully" });
    } else {
      res.send({ status: "failed", message: "Delete Failed" });
    }
    // console.log(delItem);
  } catch (error) {
    console.log(error.message);
  }
};

// Buy Product
const Buyproduct = async (req, res) => {
  const userId = req.params.id;
  const { price } = req.body;
  // console.log("====",userId,price);
  try {
    const alorder = await Order.findAll({
      where: { status: "incomplete", userId },
    });
    console.log(alorder);
    if (alorder.length === 0) {
      res.send({ status: "failed", message: "No Order to Complete" });
    } else {
      const id = alorder[0].id;
      console.log(id);
      const updateorder = await Order.update(
        { status: "pending", price },
        { where: { userId, id } }
      );
      const aldorder = await Order.findAll({
        where: { status: "pending", userId },
      });
      if (alorder == aldorder) {
        res.send({ status: "failed" });
      } else {
        res.send({ status: "success" });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

// Complete Orders Data
const completeOrdersData = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  let myOrderId = [];
  try {
    const myOrder = await Order.findAll({
      where: { status: "complete", userId },
    });
    for (let i = 0; i < myOrder.length; i++) {
      myOrderId.push(myOrder[i].id);
    }
    console.log(myOrderId);
    const myproducts = await Item.findAll({
      include: "products",
      where: {
        orderId: {
          [Op.in]: myOrderId,
        },
      },
    });
    res.send(myproducts);
  } catch (error) {
    console.log(error.message);
  }
};

// Pending Data
const pendingCartData = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  let myOrderId = [];
  try {
    const myOrder = await Order.findAll({
      where: { status: "pending", userId },
    });
    for (let i = 0; i < myOrder.length; i++) {
      myOrderId.push(myOrder[i].id);
    }
    console.log(myOrderId);
    const myproducts = await Item.findAll({
      include: "products",
      where: {
        orderId: {
          [Op.in]: myOrderId,
        },
      },
    });
    console.log(myproducts);
    res.send(myproducts);
  } catch (error) {
    console.log(error.message);
  }
};

// Order Data
const orderData = async (req, res) => {
  let myOrderId = [];
  try {
    const myOrder = await Order.findAll({
      where: { status: "pending" },
    });
    for (let i = 0; i < myOrder.length; i++) {
      myOrderId.push(myOrder[i].id);
    }
    console.log(myOrderId);
    const myproducts = await Item.findAll({
      include: "products",
      where: {
        orderId: {
          [Op.in]: myOrderId,
        },
      },
    });
    res.send(myproducts);
  } catch (error) {
    console.log(error.message);
  }
};

// Order Complete
const orderComplete = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    await Order.update({ status: "complete" }, { where: { id } });
    res.send("Update Sucessfully");
  } catch (error) {
    console.log(error.message);
  }
};

// Add Order
const newOrder = async (req, res) => {
  const userId = req.params.id;
  const { productId, quantity, price } = req.body;
  console.log(req.body);
  try {
    const [newOrder, created] = await Order.findOrCreate({
      where: { status: "incomplete", userId },
    });
    if (created) {
      const orderId = newOrder.id;
      const newItem = await Item.create({
        quantity,
        price,
        productId,
        orderId,
      });
      res.send({ status: "success", message: "New Order Create", Item: true });
    } else {
      const orderId = newOrder.id;
      const alItem = await Item.findAll({
        where: { orderId, productId },
      });
      if (!alItem.length) {
        const newItem = await Item.create({
          quantity,
          price,
          productId,
          orderId,
        });
        res.send({ status: "success", message: "New Item Added", Item: true });
      } else {
        const newQuantity = alItem[0]?.quantity + quantity;

        const updateItem = Item.update(
          { quantity: newQuantity },
          { where: { orderId, productId } }
        );
        const aldItem = await Item.findAll({
          where: { orderId, productId },
        });
        if (aldItem == alItem) {
          // console.log(alItem);
          res.send({ status: "failed", message: "Update Error" });
        } else {
          res.send({ status: "success", message: "Update Quantity" });
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const up = async (req, res) => {
  const userId = req.params.id;
  const { productId } = req.body;
  console.log(req.body);
  try {
    const [newOrder, created] = await Order.findOrCreate({
      where: { status: "incomplete", userId },
    });
    const orderId = newOrder.id;
    const alItem = await Item.findAll({
      where: { orderId, productId },
    });
    let newQuantity = alItem[0]?.quantity;
    // console.log(alItem);
    newQuantity++;
    const updateItem = Item.update(
      { quantity: newQuantity },
      { where: { orderId, productId } }
    );
    res.send({ status: "success", message: "Update Quantity" });
  } catch (error) {
    console.log(error.message);
  }
};

const down = async (req, res) => {
  const userId = req.params.id;
  const { productId } = req.body;
  console.log(req.body);
  try {
    const [newOrder, created] = await Order.findOrCreate({
      where: { status: "incomplete", userId },
    });
    const orderId = newOrder.id;
    const alItem = await Item.findAll({
      where: { orderId, productId },
    });
    let newQuantity = alItem[0]?.quantity;
    // console.log(alItem);
    newQuantity--;
    // let price = alItem[0]?.price;
    const updateItem = Item.update(
      { quantity: newQuantity },
      { where: { orderId, productId } }
    );
    res.send({ status: "success", message: "Update Quantity" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  readCartDataWithuserid,
  deleteCart,
  Buyproduct,
  completeOrdersData,
  pendingCartData,
  orderData,
  orderComplete,
  newOrder,
  up,
  down,
};
