import { useCallback, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MAR } from './components/MAR'
import { PC } from './components/PC'
import { UC } from './components/UC'
import { MBR } from './components/MBR'
import { IR } from './components/IR'
import { BancoRegistros } from './components/BancoRegistros'
import { ALU } from './components/ALU'
import { BusSistema } from './components/BusSistema'
import { Memoria } from './components/Memoria'
import { IO } from './components/IO'
import { Instructions } from './components/Instructions'

const App = () => {

  return (
    <div className='grid-principal'>
      <div className="grid">
        <div style={{ padding: '10px 20px', display: 'grid', gridTemplateRows: '70% 30%', height: '90vh' }}>
          <div>
            <h2 style={{ marginBottom: '10px' }}>Instrucciones</h2>
            <textarea className='instrucciones'></textarea>
          </div>
          <div>
            <button className='boton add'>ADD</button>
            <button className='boton move'>MOVE</button>
            <button className='boton sub'>SUB</button>
            <button className='boton jmp'>JMP</button>

          </div>
        </div>
        <div className='contenedor'>
          <div className='procesador'>
            <div className='izquierda'>
              <ALU />
              <BancoRegistros />
            </div>
            <div className='derecha'>
              <UC />
              <PC />
              <MAR />
              <MBR />
              <IR />
            </div>
          </div>
          <div className="es">
            <IO />
          </div>
        </div>
        <div>
          <BusSistema />
        </div>
        <div>
          <Memoria />
        </div>
      </div>
      {/* <div className="set">
        <Instructions />
      </div> */}
    </div>
  )
}

export default App
