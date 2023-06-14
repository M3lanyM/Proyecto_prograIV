import { useState } from 'react';

const DatePicker = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = event.target.value;
        const selectedDate = new Date(dateValue);
        setSelectedDate(selectedDate);
    };

    return (
        <div className="date-picker-container">
        <input
          className="date-picker-input"
          type="date"
          value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ''}
          onChange={handleDateChange}
        />
      </div>
    );
};

export default DatePicker;