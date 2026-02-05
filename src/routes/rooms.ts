import {Router} from "express";
import {getRoomsController, createRoomController, updateRoomController, deleteRoomController, getRoomByIdController} from "../controllers/rooms/index.js";
import {paginate} from "../middlewares/paginate.js";
import {validateId} from "../middlewares/validateId.js";

export const roomRouter = Router();

roomRouter.post('/', createRoomController);
roomRouter.get('/', paginate, getRoomsController);
roomRouter.get('/:id', validateId, getRoomByIdController);
roomRouter.patch('/:id', validateId, updateRoomController);
roomRouter.delete('/:id', validateId, deleteRoomController);

