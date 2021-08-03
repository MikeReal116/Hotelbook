import {
  ADD_ROOM,
  FINISH_LOADING,
  GET_ALL_ROOMS,
  GET_ROOM,
  START_LOADING,
  SUBMIT_REVIEW,
  UPDATE_ROOM
} from '../actions/constant';
import { RoomActionType } from '../types/actionType';
import { RoomType } from '../types/roomType';

type InitialState = {
  loading: boolean;
  error: string;
  rooms: RoomType[];
  room?: RoomType;
  roomsCount?: number;
  itemsPerPage?: number;
  filteredRoomCount?: number;
};
const initialState: InitialState = {
  loading: false,
  error: '',
  rooms: []
};

const roomReducer = (
  state = initialState,
  action: RoomActionType
): InitialState => {
  switch (action.type) {
    case START_LOADING:
      return {
        loading: true,
        error: '',
        rooms: [],
        roomsCount: undefined,
        itemsPerPage: undefined,
        filteredRoomCount: undefined
      };
    case FINISH_LOADING:
      return { ...state, loading: false };
    case GET_ALL_ROOMS:
      return {
        ...state,
        rooms: action.payload.rooms,
        roomsCount: action.payload.roomCount,
        itemsPerPage: action.payload.itemsPerPage,
        filteredRoomCount: action.payload.filteredRoomCount
      };
    case GET_ROOM:
      return { ...state, room: action.payload };
    case ADD_ROOM:
      return { ...state, rooms: [...state.rooms, action.payload] };
    case UPDATE_ROOM:
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room._id === action.payload._id ? action.payload : room
        )
      };
    case SUBMIT_REVIEW:
      return { ...state, room: action.payload };
    default:
      return state;
  }
};

export default roomReducer;
