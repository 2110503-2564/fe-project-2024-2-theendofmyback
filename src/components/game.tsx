import React, { useState } from 'react';

const GameComponent = () => {
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Let's play!");

  const handleClick = () => {
    const randomValue = Math.floor(Math.random() * 10);
    if (randomValue > 5) {
      setScore(score + 1);
      setMessage("You win! Keep going!");
    } else {
      setMessage("Try again!");
    }
  };

  return (
    <div>
      <h1>About Us</h1>
      <p>We are a team passionate about technology and fun!</p>
      <h2>Game: Try Your Luck!</h2>
      <p>Click the button to play and earn points.</p>
      <p>Score: {score}</p>
      <button onClick={handleClick}>Play</button>
      <p>{message}</p>
    </div>
  );
};

export default GameComponent;
