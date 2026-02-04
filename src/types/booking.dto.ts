import {UserRole} from "../models/Employee.model.js";

export type BookingEmployeeDTO = {
  name: string;
  role: UserRole;
};

export type BookingRoomDTO = {
  name: string;
  floor: number;
  capacity: number;
  type: string;
  amenities: string[];
};

export type BookingDTO = {
  id: string;
  employee: BookingEmployeeDTO;
  room: BookingRoomDTO;
  date: string;
  startTime: string;
  endTime: string;
  purpose?: string;
};
