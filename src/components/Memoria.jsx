import { forwardRef } from "react"
import { useStore } from "../hooks/useStore"
import { Popover } from 'react-tiny-popover'
import Elemento from "../components/memoria/Elemento"

export const Memoria = forwardRef((props, ref) => {

  const { state } = useStore();
  const { direcciones, datos } = state;

  return (
    <div id="memoria" className="memoria-general" ref={ref}> 
    Memory
    <h5>Direcciones</h5>
      <div className="memoriagrid">
        {
          direcciones.map((direccion, index) => (
            <>
              <Elemento key={index} data={direccion} />
            </>
          ))
        }
      </div>
      <h5>Datos</h5>
      <div className="memoriagrid">
        {
          datos.map((dato, index) => (
              <Elemento key={index} data={dato} />
          ))
        }
      </div>
    </div>
  );
})
