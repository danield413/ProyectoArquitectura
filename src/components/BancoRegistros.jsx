/*
 * Almacena valores temporales , usamos registros
 */

import { forwardRef } from "react"
import { useStore } from "../hooks/useStore"

 export const BancoRegistros = forwardRef((props, ref) => {

  const { state } = useStore();

  const { registros } = state;


  return (
    <div id="bancoRegistros" className="banco-registros" ref={ref}>
      {registros.map((registro, index) => (
        <div key={index} className="registro" style={{
          display: 'grid', gridTemplateRows: '1fr 1fr'
        }}>
          <div>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 'bold'
          }}>{registro.nombre}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
          }}>{registro.valor}</div>
          </div>
      ))}
    </div>
  );
})
