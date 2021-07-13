import Room, { RoomDocument } from '../models/Room';
import { NotFoundError } from '../utils/appError';
import { ApiFeatures } from '../utils/apiFeatures';

const createRoom = async (room: RoomDocument) => {
  return await Room.create(room);
};

const getRoom = async (id: string) => {
  const room = await Room.findById(id);
  if (!room) throw new NotFoundError('No Room Found');
  return room;
};

const updateRoom = async (id: string, data: RoomDocument) => {
  const room = await Room.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
  if (!room) throw new NotFoundError('No Room Found');
  return room;
};

const deleteRoom = async (id: string) => {
  const room = await Room.findByIdAndDelete(id);
  if (!room) throw new NotFoundError('No Room Found');
  return room;
};

const getAllRooms = async (queryString) => {
  const apiFeatures = new ApiFeatures(Room.find(), queryString)
    .filter()
    .search();

  const roomCount = await Room.countDocuments();
  const itemsPerPage = 4;
  let rooms = await apiFeatures.query;
  const filteredRoomCount = rooms.length;
  apiFeatures.paginate(itemsPerPage);
  rooms = await apiFeatures.query;
  return { roomCount, itemsPerPage, filteredRoomCount, rooms };
};

export default { createRoom, getRoom, updateRoom, deleteRoom, getAllRooms };
