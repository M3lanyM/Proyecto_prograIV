import { useState } from 'react';

interface DatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const DatePicker = ({ selectedDate, onDateChange }: DatePickerProps) => {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    const selectedDate = dateValue ? new Date(dateValue + 'T00:00:00') : null;
    onDateChange(selectedDate);
  };

  const formattedDate = selectedDate
    ? selectedDate.toISOString().split('T')[0]
    : '';

  return (
    <div className="date-picker-container">
      <input
        className="date-picker-input"
        type="date"
        value={formattedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DatePicker;
