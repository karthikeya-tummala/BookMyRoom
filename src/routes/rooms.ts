import { Router } from "express";
import { getRooms, createRoom, updateRoom, deleteRoom } from "../controllers/rooms/index.js";
import {paginate} from "../middlewares/paginate.js";

export const roomRouter = Router();

roomRouter.get('/', paginate, getRooms);
roomRouter.post('/', createRoom);
roomRouter.patch('/:id', updateRoom);
roomRouter.delete('/:id', deleteRoom);

