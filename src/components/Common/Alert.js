import React from 'react';
import './css/Alert.css';

export default function Alert({ classStyle, msg, close }) {
    return (
        <div className={classStyle}>
            <span className="closebtn" onClick={close}>&times;</span>
            {msg}
        </div>
    );
}
