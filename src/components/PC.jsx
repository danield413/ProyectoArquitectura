/*
* Mantiene la dirección de la estructura actual
 */

import { forwardRef } from "react"

export const PC = forwardRef((props, ref) => {
  return (
    <div id="pc" ref={ref} className="pc" >PC</div>
  )
})
