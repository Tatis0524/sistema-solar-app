"use client"
import tierra from "./assets/tierra.png"
import mercurio from "./assets/mercurio.jpg"
import venus from "./assets/venus.jpg"
import marte from "./assets/marte.png"
import jupiter from "./assets/jupiter.jpg"
import saturno from "./assets/saturno.jpg"
import neptuno from "./assets/neptuno.jpg"
import urano from "./assets/urano.jpg"
import otros from "./assets/otros.jpg"
import fondo from "./assets/fondo_planetas.png"   
import { useParams, useNavigate } from "react-router-dom"
import "./PlanetaDetalle.css"

/*
  Componente que muestra información detallada de cada planeta.
  Incluye una lista de planetas y al seleccionar uno, se muestra su descripción.
*/
const datosPlanetas = {
   // Lista de planetas y sus datos básicos
  mercury: {
    nombre: "Mercurio (El Planeta Más Cercano al Sol)",
    descripcion: `Mercurio es el planeta más pequeño y cercano al Sol del Sistema Solar. Su superficie está llena de cráteres similares a los de la Luna y experimenta temperaturas extremas.`,
    datos: [
      "🚀 Tamaño: Radio de 2,439 km.",
      "🔭 Distancia del Sol: 57.9 millones de km.",
      "🌞 Temperatura: Varía entre 430°C durante el día y -180°C por la noche.",
      "🌑 Dato curioso: Un día en Mercurio dura 176 días terrestres.",
      "🔄 Movimiento: Completa una órbita alrededor del Sol cada 88 días terrestres.",
    ],
    imagen: mercurio,
  },
  venus: {
    nombre: "Venus (El Planeta Más Caliente)",
    descripcion: `Venus es el segundo planeta desde el Sol y el más caliente del Sistema Solar. Está cubierto por una densa atmósfera tóxica principalmente compuesta de dióxido de carbono.`,
    datos: [
      "🚀 Tamaño: Radio de 6,051 km.",
      "🌎 Este tamaño es similar al de la Tierra, lo que lo hace su 'planeta gemelo' en tamaño.",
      "🔭 Distancia del Sol: 108.2 millones de km.",
      "🌞 Temperatura: Promedio de 462°C (suficiente para derretir plomo).",
      "🌍 Dato curioso: Gira en dirección opuesta a la mayoría de los planetas.",
      "🔄 Movimiento: Un día en Venus dura más que su año (243 días terrestres).",
    ],
    imagen: venus,
  },
  tierra: {
    nombre: "La Tierra (Nuestro Hogar Azul)",
    descripcion: `La Tierra es el tercer planeta desde el Sol y el único conocido con vida. Tiene una atmósfera rica en nitrógeno y oxígeno, y es el único planeta con agua líquida en su superficie, cubriendo aproximadamente el 71% de su superficie.`,
    datos: [
      "🚀 Tamaño: Radio de 6,371 km.",
      "🔭 Distancia del Sol: 149.6 millones de km.",
      "🌞 Temperatura promedio: 15°C (ideal para la vida).",
      "🌍 Dato curioso: Es el único planeta con océanos de agua líquida y una atmósfera rica en oxígeno.",
      "🔄 Movimiento: La Tierra gira sobre su eje en 24 horas, causando el día y la noche.",
    ],
    imagen: tierra,
  },
  mars: {
    nombre: "Marte (El Planeta Rojo)",
    descripcion: `Marte es el cuarto planeta desde el Sol, conocido por su color rojizo debido al óxido de hierro en su superficie. Tiene la montaña más alta y el cañón más grande del Sistema Solar.`,
    datos: [
      "🚀 Tamaño: Radio de 3,389 km.",
      "🔭 Distancia del Sol: 227.9 millones de km.",
      "🌞 Temperatura: Varía entre 20°C y -153°C.",
      "🌑 Dato curioso: Tiene dos pequeñas lunas llamadas Fobos y Deimos.",
      "🔄 Movimiento: Un día marciano dura 24.6 horas terrestres.",
    ],
    imagen: marte,
  },
  jupiter: {
    nombre: "Júpiter (El Gigante Gaseoso)",
    descripcion: `Júpiter es el planeta más grande del Sistema Solar, compuesto principalmente de hidrógeno y helio. Tiene una Gran Mancha Roja, que es una tormenta que ha durado cientos de años.`,
    datos: [
      "🚀 Tamaño: Radio de 69,911 km (11 veces el de la Tierra).",
      "🔭 Distancia del Sol: 778.5 millones de km.",
      "🌞 Temperatura: Aproximadamente -145°C en la capa de nubes.",
      "🌌 Dato curioso: Tiene al menos 79 lunas, incluyendo las cuatro grandes lunas galileanas.",
      "🔄 Movimiento: Completa una rotación en solo 9.93 horas a pesar de su tamaño. Tiene el día más corto de todos los planetas",
    ],
    imagen: jupiter,
  },
  saturn: {
    nombre: "Saturno (El Señor de los Anillos)",
    descripcion: `Saturno es famoso por sus impresionantes anillos, compuestos principalmente de partículas de hielo y roca. Es el segundo planeta más grande del Sistema Solar.`,
    datos: [
      "🚀 Tamaño: Radio de 58,232 km.",
      "🔭 Distancia del Sol: 1,434 millones de km.",
      "🌞 Temperatura: Aproximadamente -178°C.",
      "💫 Dato curioso: Sus anillos se extienden hasta 282,000 km desde el planeta, pero solo tienen unos 10 metros de grosor.",
      "🌌 Tiene más de 80 lunas, siendo Titán la más grande y con atmósfera densa.",
    ],
    imagen: saturno,
  },
  uranus: {
    nombre: "Urano (El Planeta Inclinado)",
    descripcion: `Urano es el séptimo planeta desde el Sol y tiene la característica única de girar de lado, con su eje de rotación casi paralelo a su órbita. Tiene un color azul verdoso debido al metano en su atmósfera.`,
    datos: [
      "🚀 Tamaño: Radio de 25,362 km.",
      "🔭 Distancia del Sol: 2,871 millones de km.",
      "❄️ Temperatura: Aproximadamente -224°C. Es el planeta más frío del Sistema Solar",
      '🌌 Dato curioso: Gira "acostado" con una inclinación de 98 grados.',
      "💫 Tiene 27 lunas conocidas, todas nombradas por personajes de obras de Shakespeare y Pope.",
    ],
    imagen: urano,
  },
  neptune: {
    nombre: "Neptuno (El Gigante Azul)",
    descripcion: `Neptuno es el planeta más lejano del Sistema Solar (desde que Plutón fue reclasificado). Es un gigante de hielo con vientos extremadamente rápidos y una gran mancha oscura similar a la de Júpiter.`,
    datos: [
      "🚀 Tamaño: Radio de 24,622 km.",
      "🔭 Distancia del Sol: 4,495 millones de km.",
      "🌞 Temperatura: Aproximadamente -214°C.",
      "🌪️ Dato curioso: Tiene los vientos más rápidos del Sistema Solar, alcanzando 2,100 km/h.",
      "🌌 Fue descubierto mediante cálculos matemáticos antes de ser observado.",
      "🌬️ Sus vientos alcanzan hasta 2,100 km/h, siendo los más rápidos del Sistema Solar.",
    ],
    imagen: neptuno,
  },
  others: {
    nombre: "Otros Cuerpos del Sistema Solar",
    descripcion: `Además de los ocho planetas principales, nuestro Sistema Solar contiene una variedad de otros objetos fascinantes, como planetas enanos, asteroides, cometas y objetos del Cinturón de Kuiper.`,
    datos: [
      "🪐 Planetas Enanos: Plutón, Ceres, Eris, Haumea y Makemake.",
      "☄️ Cometas: Cuerpos helados que desarrollan colas cuando se acercan al Sol.",
      "🌠 Asteroides: Principalmente ubicados en el Cinturón de Asteroides entre Marte y Júpiter.",
      "❄️ Objetos del Cinturón de Kuiper: Región más allá de Neptuno con miles de pequeños cuerpos helados.",
      "☀️ Nube de Oort: Esfera hipotética de objetos helados que rodea todo el Sistema Solar.",
    ],
    imagen: otros,
  },
}
 // Estado que controla el planeta seleccionado
const PlanetaDetalle = () => {
  const { nombre } = useParams()
  const navigate = useNavigate()
  const planeta = datosPlanetas[nombre]

  if (!planeta)
    return (
      <div className="planeta-no-encontrado">
        <h2>Planeta no encontrado</h2>
        <button onClick={() => navigate("/exploracion")}>Volver a Exploración</button>
      </div>
    )

  return (
    <div className="planeta-detalle-container" style={{ backgroundImage: `url(${fondo})` }}>
      {/* Botón de regreso */}
      <button className="back-button" onClick={() => navigate("/exploracion")}>
        <span className="arrow">←</span> REGRESAR
      </button>

      <div className="planeta-detalle-content">
        <div className="planeta-imagen-container">
          <img src={planeta.imagen || "/placeholder.svg"} alt={nombre} className="planeta-imagen" />
        </div>

        <div className="planeta-info">
          <h2 className="planeta-titulo">{planeta.nombre}</h2>
          <p className="planeta-descripcion">{planeta.descripcion}</p>

          <ul className="planeta-datos-lista">
            {planeta.datos.map((dato, i) => (
              <li key={i} className="planeta-dato-item">
                {dato}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PlanetaDetalle
