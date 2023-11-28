import React from 'react';
import './Radio.css';

type RadioProps = {
  options: string[];
};

const Radio: React.FC<RadioProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="radio-container">
      {options.map((option) => (
        <label className='radios' key={option}>
          <input
            className='radio-button'
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={() => handleOptionChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default Radio;
