/*
* Dirige el flujo de datos y controla el ciclo de instrucciones
*/

import { forwardRef } from "react"

export const UC = forwardRef((props, ref) => {
  return (
    <div id="uc" ref={ref} id="uc" className="uc">UC</div>
  )
})
