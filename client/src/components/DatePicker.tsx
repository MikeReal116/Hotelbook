import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { RootStore } from '../redux/reducers';

type PropType = {
  startDate: Date | null;
  endDate: Date | null;
  handleDateChange: (dates: Date | [Date, Date] | null) => void;
};
const DatePickerComponent = ({
  handleDateChange,
  startDate,
  endDate
}: PropType) => {
  const { booked } = useSelector((state: RootStore) => state.booking);

  const bookedDates = booked ? booked.map((date) => new Date(date)) : [];

  return (
    <DatePicker
      onChange={handleDateChange}
      startDate={startDate}
      endDate={endDate}
      excludeDates={bookedDates}
      selectsRange
      minDate={new Date()}
      inline
    />
  );
};

export default DatePickerComponent;
