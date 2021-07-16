type ReviewType = {
  _id: string;
  reviewerName: string;
  rating: number;
  review: string;
  createdAt: Date;
};
export type RoomType = {
  _id: string;
  name: string;
  address: string;
  price: number;
  description: string;
  rating?: number;
  numberOfRating?: number;
  WiFi?: boolean;
  breakfast?: boolean;
  numberOfBeds?: number;
  images: string[];
  guestCapacity?: number;
  user?: string;
  review?: ReviewType[];
};

export type AllRoomType = {
  roomCount?: number;
  itemsPerPage?: number;
  filteredRoomCount?: number;
  rooms: RoomType[];
};
