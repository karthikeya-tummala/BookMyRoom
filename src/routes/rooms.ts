import {Router} from "express";
import {getRooms, createRoom, updateRoom, deleteRoom, getRoomById} from "../controllers/rooms/index.js";
import {paginate} from "../middlewares/paginate.js";
import {validateId} from "../middlewares/validateId.js";

export const roomRouter = Router();

roomRouter.post('/', createRoom);
roomRouter.get('/', paginate, getRooms);
roomRouter.get('/:id', validateId, getRoomById);
roomRouter.patch('/:id', validateId, updateRoom);
roomRouter.delete('/:id', validateId, deleteRoom);

