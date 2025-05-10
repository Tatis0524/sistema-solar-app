"use client"

import { useEffect } from "react"
import Phaser from "phaser"
import { useNavigate } from "react-router-dom"

class PlanetPuzzleScene extends Phaser.Scene {
  constructor() {
    super({ key: "PlanetPuzzleScene" })
    this.planets = []
    this.targetPositions = []
    this.planetNames = ["mercurio", "venus", "tierra", "marte", "jupiter", "saturno", "urano", "neptuno", "pluton"]
    this.totalPlanets = 9
    this.planetsPlaced = 0
  }

  preload() {
    this.load.image("background", "/assets/space_background.jpg")
    this.load.image("sun", "/assets/sun.png")

    this.planetNames.forEach((planet) => {
      this.load.image(planet, `/assets/${planet}.png`)
    })

    this.load.audio("correct", "/assets/correct.mp3")
    this.load.audio("win", "/assets/win.mp3")
  }

  create() {
    this.correctSound = this.sound.add("correct")
    this.winSound = this.sound.add("win")

    this.add.image(80, 300, "sun").setScale(0.7) // Sol a la izquierda

    this.createOrbits()
    this.setupTargetPositions()
    this.createPlanets()

    this.add.text(550, 50, "Arrastra cada planeta a su órbita correcta", {
      font: "20px Arial",
      fill: "#ffffff",
      align: "center",
    }).setOrigin(0.5)

    this.placedText = this.add.text(550, 650, "Planetas colocados: 0/9", {
      font: "18px Arial",
      fill: "#ffffff",
      align: "center",
    }).setOrigin(0.5)
  }

  createOrbits() {
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0xffffff, 0.3);

    this.orbitCenters = { x: 300, y: this.game.config.height / 2 }; // Más centrado

    for (let i = 0; i < this.planetNames.length; i++) {
        const radiusX = 180 + i * 90 // Más ancho horizontal
        const radiusY = 100 + i * 25 // Más ovalado vertical
        graphics.strokeEllipse(this.orbitCenters.x, this.orbitCenters.y, radiusX * 2, radiusY * 2)
    }
  }

  setupTargetPositions() {
    this.targetPositions = []

    for (let i = 0; i < this.planetNames.length; i++) {
        const angle = Phaser.Math.DegToRad(45) // Posiciona en diagonal superior derecha
        const radiusX = 180 + i * 90
        const radiusY = 100 + i * 25
        
        const x = this.orbitCenters.x + radiusX * Math.cos(angle)
        const y = this.orbitCenters.y + radiusY * Math.sin(angle)        

      this.targetPositions.push({
        x,
        y,
        name: this.planetNames[i]
      })
    }
  }

  createPlanets() {
    const scales = {
      mercury: 0.15,
      venus: 0.18,
      earth: 0.20,
      mars: 0.17,
      jupiter: 0.35,
      saturn: 0.33,
      uranus: 0.25,
      neptune: 0.25,
      pluto: 0.12,
    }

    const shuffled = [...this.planetNames].sort(() => Math.random() - 0.5)

    shuffled.forEach((planetName, index) => {
      const x = 150 + index * 95
      const y = 750

      const planet = this.add.image(x, y, planetName)
        .setScale(scales[planetName])
        .setInteractive({ draggable: true })
        .setData("name", planetName)
        .setData("inPlace", false)

      planet.on("dragstart", function () {
        this.setTint(0xffff00)
        this.setDepth(1)
      })

      planet.on("drag", function (pointer, dragX, dragY) {
        this.x = dragX
        this.y = dragY
      })

      planet.on("dragend", (pointer) => {
        planet.clearTint()
        planet.setDepth(0)
        this.checkPlanetPosition(planet)
      })

      this.input.setDraggable(planet)
      this.planets.push(planet)
    })
  }

  checkPlanetPosition(planet) {
    const planetName = planet.getData("name")
    const target = this.targetPositions.find(pos => pos.name === planetName)

    if (!target) return

    const distance = Phaser.Math.Distance.Between(planet.x, planet.y, target.x, target.y)

    if (distance < 40 && !planet.getData("inPlace")) {
      planet.setPosition(target.x, target.y)
      planet.setData("inPlace", true)
      planet.disableInteractive()
      this.planetsPlaced++
      this.correctSound.play()
      this.placedText.setText(`Planetas colocados: ${this.planetsPlaced}/9`)

      if (this.planetsPlaced === this.totalPlanets) {
        this.gameWin()
      }
    }
  }

  gameWin() {
    this.winSound.play()

    this.add.text(550, 300, "¡Felicidades!\nHas completado el Sistema Solar", {
      font: "32px Arial",
      fill: "#ffffff",
      align: "center",
    }).setOrigin(0.5)

    this.planets.forEach((planet) => {
      this.tweens.add({
        targets: planet,
        alpha: 0.7,
        yoyo: true,
        repeat: -1,
        duration: 500,
      })
    })

    this.add.text(550, 400, "Jugar de nuevo", {
      font: "24px Arial",
      fill: "#ffffff",
      backgroundColor: "#1a6dd9",
      padding: { x: 20, y: 10 },
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.restart()
      })
  }
}

function PuzzleGame() {
  useEffect(() => {
    const config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: "game-container",
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 0 },
            debug: false,
          },
        },
        scene: [PlanetPuzzleScene],
      }      

    const game = new Phaser.Game(config)
    return () => game.destroy(true)
  }, [])

  const navigate = useNavigate()
      
  return (
    <div className="puzzle-game" style={{ margin: 0, padding: 0 }}>
        <button className="back-button" onClick={() => navigate("/")}>
              <span className="arrow">←</span> REGRESAR
        </button>
        <h1 className="game-title">Rompecabezas del Sistema Solar</h1>
        <div id="game-container" style={{ width: "100vw", height: "100vh", overflow: "hidden" }}></div>
    </div>
  )
}

export default PuzzleGame
