"use client";
import { useState } from "react";
import { Calendar, theme } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { format } from "@formkit/tempo";
export function Date({ date }: { date: Date }) {
  console.log(date);
  const [value, setValue] = useState(() => dayjs(date));
  const { token } = theme.useToken();
  const wrapperStyle: React.CSSProperties = {
    width: 320,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  const onSelect = (newValue: Dayjs) => {
    console.log("");
  };

  const onPanelChange = (newValue: Dayjs) => {
    console.log("");
  };
  return (
    <div style={wrapperStyle}>
      <Calendar
        headerRender={({ value, type, onChange, onTypeChange }) => {
          return <div style={{ padding: 8 }}>{format(date, "full")}</div>;
        }}
        fullscreen={false}
        defaultValue={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        mode="month"
        validRange={[value, value]}
      />
    </div>
  );
}
