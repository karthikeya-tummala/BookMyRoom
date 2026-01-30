import { Router } from "express";
import { getRooms } from "../controllers/rooms/getRooms.js";

export const roomRouter = Router();

roomRouter.get('/', getRooms);