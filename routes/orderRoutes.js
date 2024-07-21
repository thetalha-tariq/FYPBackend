const express = require("express");
const router = express.Router();
const OrderController = require('../app/api/controller/orderController');

router.post("/create", OrderController.create);
router.delete("/:id", OrderController.delete);
router.get("/get", OrderController.getAll);
// router.get("/total-orders", OrderController.countTotalOrders);
// router.get("/total-sales", OrderController.calculateTotalSales);
// router.get("/total-sales-by-date", OrderController.calculateTotalSalesByDate);
// router.get("/:id", OrderController.findOrderById);
// router.put("/:id/pay", OrderController.markOrderAsPaid);
// router.put("/:id/deliver", OrderController.markOrderAsDelivered);

module.exports = router;
