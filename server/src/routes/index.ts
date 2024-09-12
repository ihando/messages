import express from "express";
import { test } from "../controllers/indexcontroller";

const router = express.Router();

router.get("/", test);

export default router;
