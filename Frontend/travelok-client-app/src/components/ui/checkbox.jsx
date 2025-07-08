// components/ui/checkbox.js
import React from "react";

export const Checkbox = ({ id, checked, onCheckedChange, className }) => {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className={className}
    />
  );
};
