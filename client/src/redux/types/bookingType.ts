export type BookingType = {
  roomId: string;
  userId: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  amount: number;
  createdAt?: Date;
};
