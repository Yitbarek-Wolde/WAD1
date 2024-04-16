import React, { useState } from 'react';

const TempConvert = () => {

  const [cel, setCel] = useState<number>(0);
  const [fah, setFah] = useState<number>(32);

  const tocel = (fValue: number): number => {
    return ((fValue - 32) * 5) / 9;
  };

  const toFah = (cValue: number): number => {
    return (cValue * 9) / 5 + 32;
  };

  const celChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cValue = parseFloat(event.target.value);
    setCel(cValue);
    setFah(toFah(cValue));
  };

  const fahChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fValue = parseFloat(event.target.value);
    setFah(fValue);
    setCel(tocel(fValue));
  };

  return (
    <div>
      <div>
        <label>Celsius  = </label>
        <input type="number" value={cel} onChange={celChange}/>
      </div>
      <div>
        <label>Fahrenheit = </label>
        <input type="number" value={fah} onChange={fahChange} />
      </div>
    </div>
  );
};

export default TempConvert;
