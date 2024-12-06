/*
* Mantiene la dirección de la estructura actual
 */

import { forwardRef } from "react"
import { useStore } from "../hooks/useStore"

export const PC = forwardRef((props, ref) => {

  const { state } = useStore();

  const { pc } = state;

  return (
    <div id="pc" ref={ref} className="pc" >
      <p>PC</p>
      <p>{pc}</p>
    </div>
  )
})
