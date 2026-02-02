import { Router } from "express";
import { getRooms, createRoom, updateRoom, deleteRoom } from "../controllers/rooms/index.js";

export const roomRouter = Router();

roomRouter.get('/', getRooms);
roomRouter.post('/', createRoom);
roomRouter.patch('/:id', updateRoom);
roomRouter.delete('/:id', deleteRoom);

