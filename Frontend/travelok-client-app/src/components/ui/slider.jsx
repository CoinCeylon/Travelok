// components/ui/slider.js
import React from "react";

export const Slider = ({ value, onValueChange, min, max, step, className }) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onValueChange([Number(e.target.value)])}
      className={className}
    />
  );
};
