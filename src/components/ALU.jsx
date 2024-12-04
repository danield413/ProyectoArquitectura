/* logica como suma, resta, multiplicacion, division, logico aritmeticas
  * 1. Suma
  * 2. Resta
  * 3. Multiplicacion
  * 4. Division
  * 5. Negacion
  * 6. And
  * 7. Or
  * 
*/

import React, {forwardRef, useRef} from "react";
import Xarrow from "react-xarrows";

export const ALU = forwardRef((props, ref) => {
  return (
    <div id="alu" ref={ref} className="alu"></div>
  )
});
