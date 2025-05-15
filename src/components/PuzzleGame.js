import React, { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import "./PuzzleGame.css"

const planetNames = [
  "mercurio", "venus", "tierra", "marte", "jupiter",
  "saturno", "urano", "neptuno"
]

const dropZonePositions = [
  { left: 250, top: 343 },   // Mercurio
  { left: 325, top: 341 },   // Venus
  { left: 422, top: 341 },   // Tierra
  { left: 515, top: 343 },   // Marte
  { left: 647, top: 340 },   // Júpiter
  { left: 819, top: 340 },   // Saturno
  { left: 961, top: 341 },   // Urano
  { left: 1069, top: 338 },  // Neptuno
]

function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const PuzzleGame = () => {
  const navigate = useNavigate()
  const [shuffledPlanets] = useState(shuffle(planetNames))
  const [planetsPlaced, setPlanetsPlaced] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [gameStatus, setGameStatus] = useState('playing') // 'playing', 'won', 'lost'
  
  const audioRefs = useRef({
    correct: new Audio('/assets/correct.mp3'),
    wrong: new Audio('/assets/wrong.mp3'),
    win: new Audio('/assets/win.mp3'),
    lose: new Audio('/assets/lose.mp3')
  })

  // Mapa para rastrear qué planetas ya fueron colocados
  const placedPlanetsRef = useRef(new Set())

  useEffect(() => {
    // Precargar audios
    Object.values(audioRefs.current).forEach(audio => {
      audio.load()
    })
  }, [])

  useEffect(() => {
    if (gameStatus !== 'playing') return

    const planets = document.querySelectorAll(".planet")
    const dropZones = document.querySelectorAll(".drop-zone")

    const handleDragStart = (e) => {
      e.dataTransfer.setData("text/plain", e.target.dataset.planet)
    }

    const handleDrop = (e) => {
      e.preventDefault()
      if (gameStatus !== 'playing') return

      const planetName = e.dataTransfer.getData("text/plain")
      const draggedPlanet = document.querySelector(`.planet[data-planet="${planetName}"]`)
      const targetZone = e.currentTarget

      // Si la zona ya tiene un planeta, no hacer nada
      if (targetZone.children.length > 0) {
        audioRefs.current.correct.play().catch(e => console.log("Audio error:", e))
        return
      }

      // Verificar si el planeta coincide con la zona
      if (targetZone.dataset.planet === planetName) {
        // Reproducir sonido de acierto
        audioRefs.current.correct.play().catch(e => console.log("Audio error:", e))
        
        // Clonar el planeta para evitar problemas con React
        const clonedPlanet = draggedPlanet.cloneNode(true)
        clonedPlanet.style.position = "absolute"
        clonedPlanet.style.top = "0"
        clonedPlanet.style.left = "0"
        clonedPlanet.draggable = false
        
        // Limpiar la zona por si acaso
        while (targetZone.firstChild) {
          targetZone.removeChild(targetZone.firstChild)
        }
        
        targetZone.appendChild(clonedPlanet)
        
        // Marcar el planeta original como invisible
        draggedPlanet.style.visibility = "hidden"
        
        // Actualizar el conteo si no estaba ya colocado
        if (!placedPlanetsRef.current.has(planetName)) {
          placedPlanetsRef.current.add(planetName)
          const newCount = planetsPlaced + 1
          setPlanetsPlaced(newCount)
          
          // Verificar si ganó
          if (newCount === planetNames.length) {
            setGameStatus('won')
            audioRefs.current.win.play().catch(e => console.log("Audio error:", e))
          }
        }
      } else {
        audioRefs.current.wrong.play().catch(e => console.log("Audio error:", e))
        setMistakes(prev => {
          const newMistakes = prev + 1
          if (newMistakes >= 3) {
            setGameStatus('lost')
            audioRefs.current.lose.play().catch(e => console.log("Audio error:", e))
          }
          return newMistakes
        })
      }
    }

    planets.forEach(planet => {
      planet.addEventListener("dragstart", handleDragStart)
    })

    dropZones.forEach(zone => {
      zone.addEventListener("dragover", e => e.preventDefault())
      zone.addEventListener("drop", handleDrop)
    })

    return () => {
      planets.forEach(planet => {
        planet.removeEventListener("dragstart", handleDragStart)
      })
      dropZones.forEach(zone => {
        zone.removeEventListener("dragover", e => e.preventDefault())
        zone.removeEventListener("drop", handleDrop)
      })
    }
  }, [gameStatus, planetsPlaced])

  const resetGame = () => {
    setPlanetsPlaced(0)
    setMistakes(0)
    setGameStatus('playing')
    placedPlanetsRef.current.clear()
    
    // Mostrar todos los planetas nuevamente
    const planets = document.querySelectorAll(".planet")
    planets.forEach(planet => {
      planet.style.visibility = "visible"
    })
    
    // Limpiar las zonas de drop
    const dropZones = document.querySelectorAll(".drop-zone")
    dropZones.forEach(zone => {
      while (zone.firstChild) {
        zone.removeChild(zone.firstChild)
      }
    })
  }

  const planetSizes = {
    mercurio: 35,
    venus: 75,
    tierra: 80,
    marte: 70,
    jupiter: 150,
    saturno: 207,
    urano: 92,
    neptuno: 80,
  }

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate("/")}>← REGRESAR</button>
      <h1>Arrastra y ubica correctamente los planetas en sus posiciones</h1>

      <div className="counters">
        <div className="planets-counter">Planetas: {planetsPlaced}/{planetNames.length}</div>
        <div className="mistakes-counter">Errores: {mistakes}/3</div>
      </div>

      {gameStatus === 'won' && (
        <div className="game-overlay">
          <div className="game-message">
            <h2>🎉 ¡Felicidades! Has completado el sistema solar.</h2>
            <div className="game-buttons">
              <button onClick={resetGame}>Jugar de nuevo</button>
              <button onClick={() => navigate("/")}>Salir del juego</button>
            </div>
          </div>
        </div>
      )}

      {gameStatus === 'lost' && (
        <div className="game-overlay">
          <div className="game-message">
            <h2>😢 ¡Perdiste! Mejor suerte la próxima vez.</h2>
            <div className="game-buttons">
              <button onClick={resetGame}>Intentar de nuevo</button>
              <button onClick={() => navigate("/")}>Salir del juego</button>
            </div>
          </div>
        </div>
      )}

      <div className="puzzle">
        <img src="/assets/solar_template.png" className="template" alt="Sistema Solar" />
        {planetNames.map((name, index) => (
          <div
            key={`zone-${name}`}
            className="drop-zone"
            data-planet={name}
            style={{
              ...dropZonePositions[index],
              width: `${planetSizes[name]}px`,
              height: `${planetSizes[name]}px`,
              marginLeft: `-${planetSizes[name] / 2}px`,
              marginTop: `-${planetSizes[name] / 2}px`,
            }}
          ></div>
        ))}
      </div>

      {shuffledPlanets.map((name, index) => {
        const isLeft = index % 2 === 0
        const sideClass = isLeft ? "planet-left" : "planet-right"
        const verticalPos = 100 + index * 100

        return (
          <img
            key={`planet-${name}-${index}`}
            src={`/assets/${name}.png`}
            className={`planet ${sideClass}`}
            draggable={gameStatus === 'playing'}
            data-planet={name}
            alt={name}
            style={{
              top: `${verticalPos}px`,
              width: `${planetSizes[name]}px`,
              height: `${planetSizes[name]}px`,
              cursor: gameStatus === 'playing' ? 'grab' : 'default',
              visibility: placedPlanetsRef.current.has(name) ? 'hidden' : 'visible'
            }}
          />
        )
      })}
    </div>
  )
}

export default PuzzleGame