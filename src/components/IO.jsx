
/*
* Simulamos dispositivos de entrada y salida de datos.
*/

import { forwardRef } from "react"
import { useStore } from "../hooks/useStore"

export const IO = forwardRef((props, ref) => {

  const  { state } = useStore();

  const { registros } = state;

  return (
    <div id="io" ref={ref} className='io'>
      <p>IO</p>
      <br />

      {
        registros.map((registro, index) => (
          <div key={index}>
            <p>{registro.nombre} : 

              {
                registro.valor !== '' ? ` ${parseInt(registro.valor, 2)}` : ''
              }
            </p>
          </div>
        ))
      }
    </div>
  )
})
