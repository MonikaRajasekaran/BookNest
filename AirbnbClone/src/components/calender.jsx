import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar, { DateObject } from 'react-multi-date-picker';
import { setDates } from '../features/dateSlice'; // Adjust import path

const MultiRangeCalendar = () => {
  const dispatch = useDispatch();
  const { checkInDate, checkOutDate } = useSelector((state) => state.date);

  // Initialize values using DateObject to format dates correctly
  const [values, setValues] = useState([
    checkInDate ? new DateObject(checkInDate) : new DateObject(),
    checkOutDate ? new DateObject(checkOutDate) : new DateObject().add(1, 'day'),
  ]);

  useEffect(() => {
    // Sync with redux state
    setValues([
      checkInDate ? new DateObject(checkInDate) : new DateObject(),
      checkOutDate ? new DateObject(checkOutDate) : new DateObject().add(1, 'day'),
    ]);
  }, [checkInDate, checkOutDate]);

  // Handle date changes and dispatch to Redux
  const handleDateChange = (newDates) => {
    setValues(newDates);

    const obj = {
      checkInDate: newDates[0] ? newDates[0].format('YYYY-MM-DD') : "NULL",
      checkOutDate: newDates[1] ? newDates[1].format('YYYY-MM-DD') : "NULL",
    };

    if (obj.checkInDate !== "NULL" && obj.checkOutDate !== "NULL") {
      dispatch(setDates(obj));
    }
  };

  return (
    <div className="calendar border-b">
      <h2 className="text-2xl font-bold mt-6 ">Select check-in date</h2>
      <p>Add your travel dates for exact pricing</p>

      {/* Calendar is always visible */}
      <div className="calendar-wrapper mb-10 ">
        <Calendar
          value={values}
          onChange={handleDateChange}
          range
          numberOfMonths={2} // Shows two months side by side
          showOtherDays
          minDate={new DateObject()} // Prevents selecting past dates
          className="custom-calendar p-12"
          hideYear
          style={{ padding: '20px' }}
        />
      </div>
    </div>
  );
};

export default MultiRangeCalendar;
