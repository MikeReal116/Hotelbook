import { Request, Response, NextFunction } from 'express';

import RoomServices from '../services/room';
import { InternalServerError, BadRequestError } from '../utils/appError';

export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await RoomServices.createRoom(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.name === 'ValidationError')
      return next(new BadRequestError('Bad Request'));
    next(new InternalServerError('Internal server error'));
  }
};

export const getAllRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queryString = req.query;
  try {
    const data = await RoomServices.getAllRooms(queryString);
    res.json(data);
  } catch (error) {
    next(new InternalServerError('Internal Server Error'));
  }
};

export const getRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const room = await RoomServices.getRoom(id);
    res.json(room);
  } catch (error) {
    next(new InternalServerError('Internal Server Error'));
  }
};

export const updateRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const room = await RoomServices.updateRoom(id, data);
    res.json(room);
  } catch (error) {
    if (error.name === 'ValidationError')
      return next(new BadRequestError('Bad Request'));
    next(new InternalServerError('Internal Server Error'));
  }
};

export const deleteRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const room = await RoomServices.deleteRoom(id);
    res.json(room);
  } catch (error) {
    next(new InternalServerError('Internal Server Error'));
  }
};
