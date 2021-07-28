export type BookingType = {
  roomId: string;
  userId: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  amount: number;
  createdAt?: Date;
};

export type BookingReturn = {
  _id: string;
  roomId: [{ images: string[]; name: string }];
  userId: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  amount: number;
  createdAt: Date;
};
