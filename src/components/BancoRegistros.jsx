/*
 * Almacena valores temporales , usamos registros
 */

import { forwardRef } from "react"

 export const BancoRegistros = forwardRef((props, ref) => {
  const registros = ["AX", "AL", "BL", "CL", "AX", "AL", "BL", "CL", "AX", "AL"]; // Nombres de los registros

  return (
    <div id="banco" className="banco-registros" ref={ref}>
      {registros.map((registro) => (
        <div key={registro} className="registro">{registro}</div>
      ))}
    </div>
  );
})
