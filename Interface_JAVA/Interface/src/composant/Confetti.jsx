import React, { useState, useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import confetti from 'canvas-confetti';

const FormWithConfetti = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const confettiOptions = {
    particles: {
      number: { value: 100 },
      size: { value: 5 },
      move: { enable: true, speed: 5 },
      shape: { type: 'circle' },
      opacity: { value: 0.8 },
      color: { value: ['#FF0000', '#00FF00', '#0000FF'] },
    },
    interactivity: {
      events: {
        onClick: { enable: false },
        onHover: { enable: false },
      },
    },
  };

  const randomInRange = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique de soumission du formulaire
    console.log("Form submitted!");

    // Déclencher les confettis
    confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(50, 100),
      origin: { y: 0.6 },
    });

    // Afficher les confettis tsParticles (optionnel)
    setShowConfetti(true);

    // Arrêter les confettis après quelques secondes
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nom" required />
        <input type="email" placeholder="Email" required />
        <button type="submit">Soumettre</button>
      </form>

      {showConfetti && (
        <Particles id="tsparticles" init={particlesInit} options={confettiOptions} />
      )}
    </div>
  );
};

export default FormWithConfetti;
