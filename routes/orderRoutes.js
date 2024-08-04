const express = require("express");
const router = express.Router();
const OrderController = require('../app/api/controller/orderController');

router.post("/create", OrderController.createOrder);
router.get("/", OrderController.getAllOrders);
router.put("/", OrderController.updateOrderStatus);
router.get('/byId/:id', OrderController.getOrderById);
// router.get("/total-orders", OrderController.countTotalOrders);
// router.get("/total-sales", OrderController.calculateTotalSales);
// router.get("/total-sales-by-date", OrderController.calculateTotalSalesByDate);
// router.get("/:id", OrderController.findOrderById);
// router.put("/:id/pay", OrderController.markOrderAsPaid);
// router.put("/:id/deliver", OrderController.markOrderAsDelivered);

module.exports = router;
