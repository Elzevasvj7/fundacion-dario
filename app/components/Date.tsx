"use client";
import { useState } from "react";
import { parse } from "@formkit/tempo";
import { DateRange, DayPicker } from "react-day-picker";
export function Date() {
  const a = parse("2022-06-22");
  const b = parse("2022-06-25");
  const initialRange: DateRange = {
    from: a,
    to: b,
  };

  const [range, setRange] = useState<DateRange | undefined>(initialRange);
  const initiallySelectedDate = a;
  const [selectedDate, setSelectedDate] = useState(initiallySelectedDate);
  return (
    <DayPicker
      selected={selectedDate}
      footer={
        selectedDate && (
          <p>
            Week from {range?.from?.toLocaleDateString()} to
            {range?.to?.toLocaleDateString()}
          </p>
        )
      }
    />
  );
}
