import React from 'react';
import './css/Select.css';

export default function Select({ name, children, onchange }) {
    return (
        <select className="select-group" name={name} onChange={onchange}>
            {children.map((child, index) => (
                <option value={child} key={index}>{child}</option>
            ))
            }
        </select>
    );
}
