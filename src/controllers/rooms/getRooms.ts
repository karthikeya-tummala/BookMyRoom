import { Request, Response } from "express";

export const getRooms = async (req: Request, res: Response) => {

  // const rooms = Room
  return res.status(200).json({
    success: true,
    message: "Fetched all rooms successfully"
    // data: rooms,
  });
}