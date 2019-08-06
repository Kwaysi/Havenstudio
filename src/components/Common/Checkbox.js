import React from 'react';
import './css/Checkbox.css';

export default function Checkbox({ name, onClick, label, id}) {
  return (
    <div className="checkbox">
      <label for={id}>{label}</label><br/>
      <input type="radio" name={name} id={id} onclick={onClick} />
    </div>
  );
}