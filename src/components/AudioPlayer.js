// AudioPlayer.js
import React, { useEffect, useRef } from "react"
import musicaFondo from "./assets/fondo.mp3"

/*
  Componente que reproduce la musica de fondo de la aplicación.
*/

const AudioPlayer = () => {
  const musicaRef = useRef(null)

  useEffect(() => {
    const reproducir = () => {
      if (musicaRef.current) {
        musicaRef.current.volume = 0.2
        musicaRef.current.loop = true
        musicaRef.current.play().catch((e) => {
          console.warn("No se pudo reproducir automáticamente:", e)
        })
      }
    }

    // Reproducir tras interacción del usuario
    const clickListener = () => {
      reproducir()
      document.removeEventListener("click", clickListener)
    }

    document.addEventListener("click", clickListener)

    return () => {
      document.removeEventListener("click", clickListener)
    }
  }, [])

  return <audio ref={musicaRef} src={musicaFondo} />
}

export default AudioPlayer
