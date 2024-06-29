import express from "express";
import { makeReservation } from "../controllers/reservations..controller";

const router = express.Router();
router.post("/reservation", makeReservation);

export default router;
