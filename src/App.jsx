import React, { useState } from 'react';
import './App.css';

function App() {
  // State variables for inputs
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  // State variables for result and validation error
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to calculate BMI
  const calculateBMI = (e) => {
    e.preventDefault(); // Prevent page refresh on form submit

    // Clear previous error and results
    setErrorMessage('');
    setBmi(null);
    setCategory('');

    // Validation 1: Check if inputs are empty
    if (!weight || !height) {
      setErrorMessage('Please enter both weight and height.');
      return;
    }

    // Convert string inputs to numeric values
    const numWeight = parseFloat(weight);
    const numHeight = parseFloat(height);

    // Validation 2: Check if inputs are numbers greater than 0
    if (isNaN(numWeight) || numWeight <= 0) {
      setErrorMessage('Weight must be a positive number greater than 0.');
      return;
    }

    if (isNaN(numHeight) || numHeight <= 0) {
      setErrorMessage('Height must be a positive number greater than 0.');
      return;
    }

    // BMI Formula: weight (kg) / (height in meters * height in meters)
    // Convert height from centimeters (cm) to meters (m)
    const heightInMeters = numHeight / 100;
    const bmiValue = numWeight / (heightInMeters * heightInMeters);

    // Round the BMI value to 1 decimal place
    const roundedBmi = bmiValue.toFixed(1);
    setBmi(roundedBmi);

    // Determine the BMI Category based on standard ranges
    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setCategory('Normal Weight');
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setCategory('Overweight');
    } else {
      setCategory('Obesity');
    }
  };

  // Function to reset inputs, results, and error message
  const handleReset = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
    setErrorMessage('');
  };

  // Helper function to return CSS class name based on BMI category
  const getCategoryClass = () => {
    switch (category) {
      case 'Underweight':
        return 'category-underweight';
      case 'Normal Weight':
        return 'category-normal';
      case 'Overweight':
        return 'category-overweight';
      case 'Obesity':
        return 'category-obesity';
      default:
        return '';
    }
  };

  return (
    <div className="container">
      <div className="bmi-card">
        {/* App Header */}
        <h1 className="title">BMI Calculator</h1>
        <p className="subtitle">Calculate your Body Mass Index easily</p>

        {/* Input Form */}
        <form onSubmit={calculateBMI} className="bmi-form">
          {/* Weight Input Field */}
          <div className="input-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              placeholder="e.g. 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              step="any"
            />
          </div>

          {/* Height Input Field */}
          <div className="input-group">
            <label htmlFor="height">Height (cm)</label>
            <input
              type="number"
              id="height"
              placeholder="e.g. 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              step="any"
            />
          </div>

          {/* Error Message Display */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {/* Action Buttons */}
          <div className="button-group">
            <button type="submit" className="btn btn-calculate">
              Calculate BMI
            </button>
            <button type="button" onClick={handleReset} className="btn btn-reset">
              Reset
            </button>
          </div>
        </form>

        {/* Result Display Section */}
        {bmi !== null && (
          <div className="result-card">
            <span className="result-label">Your Calculated BMI</span>
            <div className="bmi-value">{bmi}</div>
            <div className={`bmi-category ${getCategoryClass()}`}>
              {category}
            </div>

            {/* Reference Table / Scale */}
            <div className="scale-guide">
              <div className={`scale-item ${category === 'Underweight' ? 'active' : ''}`}>
                <span className="scale-range">&lt; 18.5</span>
                <span className="scale-name">Underweight</span>
              </div>
              <div className={`scale-item ${category === 'Normal Weight' ? 'active' : ''}`}>
                <span className="scale-range">18.5 – 24.9</span>
                <span className="scale-name">Normal</span>
              </div>
              <div className={`scale-item ${category === 'Overweight' ? 'active' : ''}`}>
                <span className="scale-range">25 – 29.9</span>
                <span className="scale-name">Overweight</span>
              </div>
              <div className={`scale-item ${category === 'Obesity' ? 'active' : ''}`}>
                <span className="scale-range">&ge; 30</span>
                <span className="scale-name">Obesity</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
