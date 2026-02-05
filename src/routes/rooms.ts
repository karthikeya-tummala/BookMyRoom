import {Router} from "express";
import {getRoomsController, createRoomController, updateRoomController, deleteRoomController, getRoomByIdController} from "../controllers/rooms/index.js";
import {paginate} from "../middlewares/paginate.js";
import {validateId} from "../middlewares/validateId.js";
import {adminMiddleware} from "../middlewares/adminMiddleware.js";

export const roomRouter = Router();

roomRouter.post('/', adminMiddleware, createRoomController);
roomRouter.get('/', paginate, getRoomsController);
roomRouter.get('/:id', validateId, adminMiddleware, getRoomByIdController);
roomRouter.patch('/:id', validateId, adminMiddleware, updateRoomController);
roomRouter.delete('/:id', validateId, adminMiddleware, deleteRoomController);

