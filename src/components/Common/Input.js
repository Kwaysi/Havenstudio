import React from 'react';
import './css/Input.css';

export default function Input({ placeHolder, name, handleChange, label, value }) {
  return (
    <div className="form-element">
      <label>{label}</label><br />
      <input placeholder={placeHolder} name={name} onChange={handleChange} value={value} />
    </div>
  );
}
