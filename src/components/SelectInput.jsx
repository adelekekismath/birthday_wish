import React from "react";

function SelectInput({ label, name, value, onChange, options }) {
  return (
      <label htmlFor={name} className="form-label">
        {label}
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="form-input"
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        </label>
    );
}

export default SelectInput;