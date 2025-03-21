'use client';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

interface DateReserveProps {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}

export default function DateReserve({ value, onChange }: DateReserveProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Event Date"
        value={value}
        onChange={onChange}
        sx={{ width: '100%' }}
      />
    </LocalizationProvider>
  );
}
