import React from 'react';
import { useState } from "react";

export default function ColorConverter() {
  const [hex, setHex] = useState('#34495e');
  const [rgb, setRgb] = useState('rgb(52, 73, 94)');

  const handlerSubmit = event => event.preventDefault();

  const converter = (event) => {
    const { value } = event.target;

    setHex(value);

    const app = document.querySelector('.App');
  
    if (value.length === 7 && value[0] === '#') {
      const inRgb = hexInRgb(event.target.value);

      if (!inRgb) {
        app.style.backgroundColor = '#c95314';
        setRgb('Ошибка!');
      }

      const rgbColor = `rgb(${inRgb.r}, ${inRgb.g}, ${inRgb.b})`;
      app.style.backgroundColor = rgbColor
      setRgb(rgbColor);
    }

    if (value.length >= 7 && value[0] !== '#') {
      app.style.backgroundColor = '#c95314';
      setRgb('Ошибка!');
    }
  }

  return (
    <React.Fragment>
      <form className="form" onSubmit={handlerSubmit} >
        <input className="hex" type="text" name="hex" maxLength="7"
          onChange={converter} value={hex} />
      </form>
      <div>
        <span>{rgb}</span>
      </div>
    </React.Fragment> 
  );

}

function hexInRgb(hex) {
  // Регулярное выражение
  // Начинается с # (может встретиться 0 или 1 раз), любой из символов от a до f, любая цифра.
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}
