import { useCallback, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {

  //* Estado inicial en 0
  //* cuando yo de click el estado inicial se aumenta en 1
  //* HOOKS --> PROGRAMACIÓN FUNCIONAL
  //*   variable    funcion           estado inicial
  const [arreglo, setArreglo] = useState([])

  //* useState --> guarda el estado
  //* useUseEffect --> se ejecuta despues de que el componente se renderiza
  //* useCallback --> guarda funciones
  //* useMemo --> guarda valores computados
  //* useForm --> guarda el estado de un formulario
  //* useRef  --> guarda una referencia a un elemento del DOM
  //* useReducer
  //* useContext

  const handleClick = () => {
    setArreglo([...arreglo, "hola"])
  }
  
  return (
    <>
    <button onClick={handleClick}>
      Cambiar
    </button>

    <p>
      {
        arreglo.map((item, index) => {
          return (
            <div key={index}>
              {item}
            </div>
          )
        })
      }
    </p>
    </>
  )
}

export default App
