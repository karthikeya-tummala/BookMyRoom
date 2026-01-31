import { Router } from "express";
import { getRooms, createRoom } from "../controllers/rooms/index.js";

export const roomRouter = Router();

roomRouter.get('/', getRooms);
roomRouter.post('/', createRoom);