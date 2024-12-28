import React from "react";


function TextInput({ label, name, type, value, onChange, required }) {
  return (
    <div className="input-group">
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="form-input"
      />
    </div>
  );
}

export default TextInput;