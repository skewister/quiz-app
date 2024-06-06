// pages/index.js
import { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import capitals from '../data/capitals.json'; // Assurez-vous d'avoir ce fichier de données

export default function Home() {
  const [currentCapital, setCurrentCapital] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    setCurrentCapital(capitals[Math.floor(Math.random() * capitals.length)]);
    const timer = setInterval(() => {
      setTimeLeft(oldTime => {
        if (oldTime === 1) clearInterval(timer);
        return oldTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [score]);

  const handleMapClick = (e) => {
    // Vérifiez si l'utilisateur a cliqué près de la capitale
    // Mettez à jour le score ou réinitialisez le jeu
  };

  return (
    <div>
      <h1>Capitale: {currentCapital ? currentCapital.name : 'Loading...'}</h1>
      <MapComponent onClick={handleMapClick} capitals={capitals} />
      <p>Score: {score}</p>
      <p>Time Left: {timeLeft}s</p>
    </div>
  );
}
