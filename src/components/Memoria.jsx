import { forwardRef } from "react"

export const Memoria = forwardRef((props, ref) => {
  const celdas = new Array(32).fill(0);
  const filas = 4;

  return (
    <div id="memoria" className="memoria-general" ref={ref}> 
    Memory
      <div className="memoria">Address
        {Array.from({ length: filas }).map((_, filaIndex) => (
          <div key={filaIndex} className="memoria-fila">
            {celdas
              .slice(filaIndex * (celdas.length / filas), (filaIndex + 1) * (celdas.length / filas))
              .map((_, celdaIndex) => (
                <div key={celdaIndex} className="memoria-celda">
                  {filaIndex * (celdas.length / filas) + celdaIndex}
                </div>
              ))}
          </div>
        ))}
      </div>
      <div className="memoria">Data
        {Array.from({ length: filas }).map((_, filaIndex) => (
          <div key={filaIndex} className="memoria-fila">
            {celdas
              .slice(filaIndex * (celdas.length / filas), (filaIndex + 1) * (celdas.length / filas))
              .map((_, celdaIndex) => (
                <div key={celdaIndex} className="memoria-celda">
                  {filaIndex * (celdas.length / filas) + celdaIndex}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
})
