
/*
* Simulamos dispositivos de entrada y salida de datos.
*/

import { forwardRef } from "react"

export const IO = forwardRef((props, ref) => {
  return (
    <div id="io" ref={ref} className='io'>IO</div>
  )
})
