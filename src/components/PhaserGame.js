import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

/*
  Este componente React integra un juego desarrollado con Phaser dentro de la aplicación web.
  Usa un `ref` para montar el canvas del juego solo una vez cuando el componente se carga.
*/

const PhaserGame = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) return;

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: '#282c34',
      parent: 'phaser-container',
      scene: {
        preload,
        create
      }
    };

    new Phaser.Game(config);
    gameRef.current = true;

    function preload() {}

    function create() {
      this.add.circle(400, 300, 50, 0x00aaff);
    }

  }, []);

  return <div id="phaser-container"></div>;
};

export default PhaserGame;