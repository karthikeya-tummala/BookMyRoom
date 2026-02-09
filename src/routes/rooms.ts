import {Router} from "express";
import {getRoomsController, createRoomController, updateRoomController, deleteRoomController, getRoomByIdController} from "../controllers/rooms/v1/index.js";
import {paginate} from "../middlewares/paginate.js";
import {validateId} from "../middlewares/validateId.js";
import {adminMiddleware} from "../middlewares/adminMiddleware.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

export const roomRouter = Router();

roomRouter.post('/', authMiddleware, adminMiddleware, createRoomController);
roomRouter.get('/', paginate, getRoomsController);
roomRouter.get('/:id', validateId, authMiddleware, adminMiddleware, getRoomByIdController);
roomRouter.patch('/:id', validateId, authMiddleware, adminMiddleware, updateRoomController);
roomRouter.delete('/:id', validateId, authMiddleware, adminMiddleware, deleteRoomController);

