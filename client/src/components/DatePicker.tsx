import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  return (
    <DatePicker
      onChange={handleDateChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      minDate={new Date()}
      inline
    />
  );
};

export default DatePickerComponent;
