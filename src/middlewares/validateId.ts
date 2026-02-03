import mongoose from 'mongoose';
import {ApiError} from "../utils/errors.js";

export const validateId = (req: any, _res: any, next: any) => {
  const id = req.params.id;

  if (typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError('VALIDATION_ERROR'));
  }

    next();
};
