
import express from "express";
import { placeOrder,getMyOrders,getOrderDetails, getAdminOrders,processOrder, placeOrderOnline, paymentVerification } from "../controllers/order.js";

import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";

const router=express.Router();



router.post("/createorder",isAuthenticated,placeOrder);
router.post("/createorderonline",isAuthenticated,placeOrderOnline);
router.post("/paymentverification",isAuthenticated,paymentVerification);

router.get("/myorders",isAuthenticated,getMyOrders)

router.get("/order/:id", isAuthenticated, getOrderDetails)

//admin middleware

router.get("/admin/orders", isAuthenticated,authorizedAdmin, getAdminOrders)

router.get("/admin/orders/:id", isAuthenticated,authorizedAdmin, processOrder)

export default router;